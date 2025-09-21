import { Router } from "express";
import passport from "passport";
import * as db from "../database/users.js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const Frontend_URL = process.env.Frontend_URL;

// Start Google OAuth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" }));

// Google OAuth callback — ensure session is saved BEFORE redirect
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), async (req, res, next) => {
  try {
    // optional: sync user
    const userInfo = await db.getUserByEmail(req.user.email);
    if (!userInfo) {
      // create if needed
    }

    // ✅ Critical for Safari: flush session to storage before redirecting
    req.session.save((err) => {
      if (err) return next(err);
      return res.redirect(`${Frontend_URL}/home`);
    });
  } catch (e) {
    return next(e);
  }
});

// Auth state
router.get("/api/me", (req, res) => {
  res.json({ user: req.user || null });
});

// Logout
router.post("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("sid");
      res.sendStatus(204);
    });
  });
});

// Guard (if you still export it here)
export function requireAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: "unauthorized" });
}

router.get("/api/dashboard", requireAuth, (req, res) => {
  res.json({ message: `Welcome, ${req.user.full_name}!`, role: req.user.role });
});

export default router;
