import { Router } from 'express';
import passport from 'passport';
import cookie from 'cookie';
import * as db from "../database/users.js";
const router = Router();

//  Route to initiate Google login
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })
);

//  Google OAuth callback route
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    //  const token = req.user.token;
    const userInfo = db.getUserByEmail(req.user.email);

    const payload = {
      email: req.user.email,
      full_name: req.user.full_name,
      googleid: req.user.googleid,
      photo: req.user.photo,
      id: userInfo.id,
      role: userInfo.admin ? "admin" : "user", // ✅ include role here
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set the JWT as an HTTP-only cookie
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: false, // ✅ readable by JS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 3600, // ✅ 1 hour in seconds
      path: '/',
    }));
    // Redirect to your frontend
    res.redirect(process.env.Frontend_URL || 'http://localhost:3000/home');
  }
);


//  Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

//  Protected route
router.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.send(`<h1>Welcome, ${req.user.displayName}! 🎉 <a href="/logout">Logout</a></h1>`);
});

export default router;