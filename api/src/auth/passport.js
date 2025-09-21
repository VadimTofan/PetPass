import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as db from "../database/users.js";
import dotenv from "dotenv";

dotenv.config();

// ── Env validation (helps catch “works on some devices” due to wrong URL) ──
const {
  NODE_ENV = "development",
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  PUBLIC_BASE_URL, // must be your API origin, e.g. https://api.example.com
} = process.env;

const isProd = NODE_ENV === "production";

if (isProd) {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET in production.");
  }
  if (!PUBLIC_BASE_URL || !/^https:\/\//.test(PUBLIC_BASE_URL)) {
    throw new Error("PUBLIC_BASE_URL must be set to an HTTPS URL in production.");
  }
}

// Build a stable absolute callback URL (no trailing slashes surprises)
const base = (PUBLIC_BASE_URL || "http://localhost:8000").replace(/\/+$/, "");
const CALLBACK_URL = `${base}/auth/google/callback`;

// ── Strategy ──
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    // verify callback
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value || null;
        const full_name = profile.displayName || "";
        const photo = profile.photos?.[0]?.value || null;

        // Guard: some Google accounts can hide email
        if (!email) {
          return done(null, false, { message: "Google account has no accessible email." });
        }

        let user = await db.getUserByEmail(email);

        if (!user) {
          // Create new user
          user = await db.addUser({
            email,
            full_name,
            googleid: googleId,
            photo,
          });
        } else if (!user.googleid) {
          // Optional: link Google ID if not linked yet
          try {
            await db.updateUserGoogleId(user.id, googleId);
            user.googleid = googleId;
          } catch {
            /* ignore linking errors gracefully */
          }
        }

        // Keep session small: serialize just the id (see serializeUser below)
        return done(null, { id: user.id });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ── Session serialization ──
// Store only the user id in the session cookie (smaller, more reliable)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    if (!user) return done(null, false);

    // Shape what you expose on req.user (avoid sensitive columns)
    const safeUser = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      photo: user.photo,
      role: user.admin ? "admin" : "user",
    };
    done(null, safeUser);
  } catch (err) {
    done(err);
  }
});

export default passport;
