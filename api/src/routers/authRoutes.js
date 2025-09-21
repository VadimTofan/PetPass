import { Router } from "express";
import passport from "passport";
import * as db from "../database/users.js";

import dotenv from "dotenv";

dotenv.config();

const router = Router();
const Frontend_URL = process.env.Frontend_URL;

// Start Google OAuth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" }));

// Google OAuth callback (NOTE: no { session: false } here)
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), async (req, res) => {
  // At this point, req.user is set and the session cookie has been issued.
  // If you want to ensure your app user exists/updated, you can still touch DB here:
  try {
    const userInfo = await db.getUserByEmail(req.user.email);
    if (!userInfo) {
      // optional: create in DB if your strategy didn’t already do it
    }
  } catch (e) {
    // non-fatal for redirect, but you can handle/log
    console.error(e);
  }
  // Redirect to your frontend app
  res.redirect(`${Frontend_URL}/home`);
});

// Who am I (for frontend to check auth state/UI)
router.get("/api/me", (req, res) => {
  res.json({ user: req.user || null });
});

// Logout — destroy server session and clear cookie
router.post("/auth/logout", (req, res, next) => {
  // Passport 0.6+ logout is async with a callback
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      // match cookie name from express-session config (default 'sid' above)
      res.clearCookie("sid");
      res.sendStatus(204);
    });
  });
});

// Simple auth guard (use this for protected API routes)
export function requireAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: "unauthorized" });
}

// Example protected route
router.get("/api/dashboard", requireAuth, (req, res) => {
  res.json({ message: `Welcome, ${req.user.full_name}!`, role: req.user.role });
});

export default router;
