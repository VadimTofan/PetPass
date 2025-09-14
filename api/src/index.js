import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

import petsRouter from "./routers/petsRouter.js";
import usersRouter from "./routers/usersRouter.js";
import router from "./routers/vaccinationsRouter.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsRoot = path.join(process.cwd(), "uploads");
const petUploads = path.join(uploadsRoot, "pets");
fs.mkdirSync(petUploads, { recursive: true });
app.use("/uploads", express.static(uploadsRoot));

app.get("/", (req, res) => {
  res.send("Welcome to Pet Pass");
});

app.use(petsRouter);
app.use(usersRouter);
app.use("/api", router);

app.use((err, req, res) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
