import { Router } from "express";
import db from "../../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  db.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao verificar email." });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: "Email já cadastrado." });
    }

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const insertQuery = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `;

      db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro ao criar usuário." });
        }

        res.status(201).json({
          message: "Cadastro realizado com sucesso",
          id: result.insertId,
          name,
          email,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao gerar hash da senha." });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Campo email é obrigatório." });
  }
  if (!password) {
    return res.status(400).json({ error: "Campo senha é obrigatório." });
  }

  const loginQuery =
    "SELECT id, name, email, password FROM users WHERE email = ?";

  db.query(loginQuery, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao verificar usuário." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }

    const user = results[0];

    const senhaValida = await bcrypt.compare(password, user.password);

    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  });
});

export default router;
