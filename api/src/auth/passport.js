// auth/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as db from "../database/users.js";
import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV = "development", GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PUBLIC_BASE_URL } = process.env;

const isProd = NODE_ENV === "production";

if (isProd) {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET in production.");
  }
  if (!PUBLIC_BASE_URL || !/^https:\/\//.test(PUBLIC_BASE_URL)) {
    throw new Error("PUBLIC_BASE_URL must be set to an HTTPS URL in production.");
  }
}

// Build callback URL safely
const base = (PUBLIC_BASE_URL || "http://localhost:8000").replace(/\/+$/, "");
const CALLBACK_URL = `${base}/auth/google/callback`;

// Optional: richer fields; if it fails we still proceed
async function fetchUserInfo(accessToken) {
  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error(`userinfo ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn("[AUTH] userinfo fetch failed:", e.message);
    return {};
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Minimal from Passport
        const googleId = profile?.id || null;
        const emailFromProfile = profile?.emails?.[0]?.value || null;
        const displayName = profile?.displayName || "";
        const photoFromProfile = profile?.photos?.[0]?.value || null;
        const givenFromProfile = profile?.name?.givenName || null;
        const familyFromProfile = profile?.name?.familyName || null;

        // Try to enrich (non-blocking)
        const ui = await fetchUserInfo(accessToken);

        const email = ui.email || emailFromProfile;
        const full_name = ui.name || displayName || "";
        const photo = ui.picture || photoFromProfile || null;
        const given_name = ui.given_name || givenFromProfile || null;
        const family_name = ui.family_name || familyFromProfile || null;
        const email_verified = ui.email_verified ?? null;
        const locale = ui.locale || null;
        const hd = ui.hd || null;

        if (!googleId) {
          console.error("[AUTH] Missing googleId in profile.");
          return done(null, false, { message: "No Google ID." });
        }

        // If your DB requires an email and it's missing, fail *with a clear reason*
        if (!email) {
          console.warn("[AUTH] Email missing from Google profile. Did you grant the 'email' scope?");
          // If you *can* create users without email, remove this return and proceed with googleId
          return done(null, false, { message: "Google did not provide an email." });
        }

        // Upsert
        let user = await db.getUserByEmail(email);
        if (!user) {
          user = await db.addUser({
            email,
            full_name,
            googleid: googleId,
            photo,
            given_name,
            family_name,
            locale,
            email_verified,
            hd,
          });
        } else {
          const updates = {};
          if (!user.googleid) updates.googleid = googleId;
          if (!user.photo && photo) updates.photo = photo;
          if (!user.given_name && given_name) updates.given_name = given_name;
          if (!user.family_name && family_name) updates.family_name = family_name;
          if (user.email_verified == null && email_verified != null) updates.email_verified = email_verified;
          if (!user.locale && locale) updates.locale = locale;
          if (Object.keys(updates).length) {
            try {
              await db.updateUser(user.id, updates);
            } catch (e) {
              console.warn("[AUTH] Update optional fields failed:", e.message);
            }
          }
        }

        const safeUser = {
          id: user.id,
          email,
          full_name,
          given_name,
          family_name,
          photo,
          locale,
          email_verified,
          hd,
          role: user.admin ? "admin" : "user",
        };

        console.log("[AUTH] Login OK:", { id: safeUser.id, email: safeUser.email });
        return done(null, safeUser);
      } catch (err) {
        console.error("[AUTH] Strategy error:", err);
        return done(err);
      }
    }
  )
);

// Store safe user in the session (so /auth/me returns full info)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
