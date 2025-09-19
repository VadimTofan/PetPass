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
  SESSION_SECRET = "dev-change-me",
} = process.env;

const isProd = NODE_ENV === "production";
const allowedOrigins = [
  "http://localhost:3000",
  "https://petpass-fulf.onrender.com"
];
const app = express();

// If you're behind a reverse proxy (Heroku, Vercel, Render, Nginx), enable this
// so secure cookies work correctly.
if (isProd) app.set("trust proxy", 1);

// --- CORS (must NOT be "*", otherwise cookies won't be accepted) ---
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
        process.env.NODE_ENV === "development"
          ? "lax"
          : "none", // cross-site in prod,
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

// Your app routes
app.use(petsRouter);
app.use(usersRouter);
app.use("/api", vaccinationsRouter);

app.use(authRouter);
// --- Error handler (must have 4 args!) ---
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
  next(err); // Pass error to any additional error handlers if present
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.PUBLIC_BASE_URL}`);
  console.log(`CORS origin allowed: ${allowedOrigins}`);
});
