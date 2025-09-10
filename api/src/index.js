import express from "express";
import petsRouter from "./routers/petsRouter.js";
import usersRouter from "./routers/usersRouter.js";
import vaccinationsRouter from "./routers/vaccinationsRouter.js";

import cors from "cors";

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Welcome to Pet Pass");
});

app.use(petsRouter);
app.use(usersRouter);
app.use(vaccinationsRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
