import "./config/env.js"
import express, { json } from "express";
import cors from "cors";
import db from "./database/db.js";
import authRoutes from "./routes/auth/authRoutes.js"
import teamsRoutes from "./routes/teams/teamsRoutes.js";


const app = express();

app.use(cors());
app.use(json());
app.use("/auth", authRoutes);
app.use("/api/teams", teamsRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.listen(3000, () => {
  console.log("Server rodando na porta 3000");
});