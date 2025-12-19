import express, { json } from "express";
import cors from "cors";
import db from "./database/db.js";
import userRouter from "./routes/users/userRoutes.js"

const app = express();

app.use(cors());
app.use(json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.listen(3000, () => {
  console.log("Server rodando na porta 3000");
});