import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as db from "../database/users.js";

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
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const full_name = profile.displayName;
        const photo = profile.photos?.[0]?.value;

        let user = await db.getUserByEmail(email);
        if (!user) {
          user = await db.addUser({
            email,
            full_name,
            googleid: googleId,
            photo,
          });
        }

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

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
