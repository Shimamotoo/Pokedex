import { Router } from "express";
import db from "../../database/db.js";

const router = Router();

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Campo nome é obrigatório." });
  }
  if (!email) {
    return res.status(400).json({ error: "Campo email é obrigatório." });
  }
  if (!password) {
    return res.status(400).json({ error: "Campo senha é obrigatório." });
  }

  const checkEmailQuery = "SELECT id FROM users WHERE email = ?";

  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao verificar email." });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: "Email já cadastrado." });
    }

    const insertQuery = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;

    db.query(insertQuery, [name, email, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao criar usuário." });
      }

      res.status(201).json({
        id: result.insertId,
        name,
        email
      });
    });
  });
});

export default router;