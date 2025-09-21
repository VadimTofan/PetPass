// authRoutes.js
import { Router } from "express";
import passport from "../auth/passport.js";

const router = Router();

router.get("/auth/me", (req, res) => {
  console.log("[/auth/me] origin:", req.headers.origin);
  console.log("[/auth/me] cookie header present?:", Boolean(req.headers.cookie));
  console.log("[/auth/me] sessionID:", req.sessionID);
  console.log("[/auth/me] isAuthenticated:", req.isAuthenticated ? req.isAuthenticated() : false);
  console.log("[/auth/me] req.user:", req.user);

  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ user: null });
  }
  return res.json({ user: req.user });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["openid", "profile", "email"], // must include "email"
    prompt: "select_account",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
    session: true,
  }),
  (req, res) => {
    // success
    console.log("[AUTH] Success. req.user =", req.user);
    res.redirect(process.env.FRONTEND_URL || "http://localhost:3000/");
  }
);

// simple failure + debug
router.get("/auth/failed", (req, res) => {
  res.status(401).json({ ok: false, message: "Google login failed" });
});

router.get("/auth/me", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) return res.status(401).json({ user: null });
  res.json({ user: req.user });
});

router.get("/auth/debug", (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false,
    user: req.user || null,
    cookies: Object.keys(req.cookies || {}),
    session: req.session ? { exists: true } : { exists: false },
  });
});

export default router;
