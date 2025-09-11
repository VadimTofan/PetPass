import express from "express";
import petsRouter from "./routers/petsRouter.js";
import usersRouter from "./routers/usersRouter.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Welcome to Pet Pass");
});

app.use(petsRouter);
app.use(usersRouter);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
