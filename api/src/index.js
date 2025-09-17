// index.js
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import session from "express-session";
import passport from "passport";

import "./auth/passport.js";

import petsRouter from "./routers/petsRouter.js";
import usersRouter from "./routers/usersRouter.js";
import vaccinationsRouter from "./routers/vaccinationsRouter.js";

import authRouter from "./routers/authRoutes.js";

const {
  NODE_ENV = "development",
  ORIGIN = "http://localhost:3000",
  SESSION_SECRET = "dev-change-me",
} = process.env;

const isProd = NODE_ENV === "production";

const app = express();

// If you're behind a reverse proxy (Heroku, Vercel, Render, Nginx), enable this
// so secure cookies work correctly.
if (isProd) app.set("trust proxy", 1);

// --- CORS (must NOT be "*", otherwise cookies won't be accepted) ---
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Sessions BEFORE passport ---
app.use(
  session({
    name: "sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // TODO: In production, use a shared store like Redis instead of MemoryStore
    cookie: {
      httpOnly: true,
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none" // cross-site in prod
          : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// --- Passport ---
app.use(passport.initialize());
app.use(passport.session());

// --- Static uploads ---
const uploadsRoot = path.join(process.cwd(), "uploads");
const petUploads = path.join(uploadsRoot, "pets");
fs.mkdirSync(petUploads, { recursive: true });
app.use("/uploads", express.static(uploadsRoot));

// --- Health / root ---
app.get("/", (req, res) => {
  res.send("Welcome to Pet Pass");
});

// --- Routers ---
// Auth first so /auth/google etc. are available
app.use(authRouter);

// Your app routes
app.use(petsRouter);
app.use(usersRouter);
app.use("/api", vaccinationsRouter);

// Optionally expose a simple whoami for the frontend
app.get("/api/me", (req, res) => {
  res.json({ user: req.user || null });
});

// --- Error handler (must have 4 args!) ---
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
  next(err); // Pass error to any additional error handlers if present
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`CORS origin allowed: ${ORIGIN}`);
});
