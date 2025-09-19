import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as db from "../database/users.js"; // your DB helpers

import dotenv from "dotenv";

dotenv.config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.PUBLIC_BASE_URL}/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        // Pull what you need from Google profile
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const full_name = profile.displayName;
        const photo = profile.photos?.[0]?.value;

        // Upsert / fetch your user
        let user = await db.getUserByEmail(email);
        if (!user) {
          user = await db.createUser({
            email,
            full_name,
            googleid: googleId,
            photo,
          });
        }
        // Attach minimal identity for the session
        return done(null, {
          id: user.id,
          email,
          full_name,
          googleid: googleId,
          photo,
          role: user.admin ? "admin" : "user",
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

// Store the minimal user object (or just user.id) in the session
passport.serializeUser((user, done) => {
  done(null, user); // or done(null, user.id)
});

// Hydrate from session on each request (if you serialized just id, look it up here)
passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
