import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import db from "../../database/db.js";

const router = Router();

router.post("/", authMiddleware, (req, res) => {
  const { name, pokemonIds } = req.body;

  if (!name || String(name).trim().length === 0) {
    return res.status(400).json({ error: "Campo nome não informado." });
  }

  if (!Array.isArray(pokemonIds)) {
    return res.status(400).json({ error: "pokemonIds precisa ser um array." });
  }

  if (pokemonIds.length !== 6) {
    return res.status(400).json({ error: "O time precisa ter 6 pokémons." });
  }

  if (new Set(pokemonIds).size !== pokemonIds.length) {
    return res.status(400).json({ error: "Não pode ter Pokémon duplicado no time." });
  }

  const teamName = String(name).trim();
  const userId = req.user.id;

  const checkTeamNameQuery = "SELECT id FROM teams WHERE user_id = ? AND name = ?";

  db.query(checkTeamNameQuery, [userId, teamName], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao verificar nome do time." });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: "Nome do time já cadastrado para este usuário." });
    }

    db.beginTransaction((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao iniciar transação." });
      }

      const insertTeamQuery = "INSERT INTO teams (user_id, name) VALUES (?, ?)";

      db.query(insertTeamQuery, [userId, teamName], (err, teamResult) => {
        if (err) {
          console.error(err);
          return db.rollback(() => {
            res.status(500).json({ error: "Erro ao criar o time." });
          });
        }

        const teamId = teamResult.insertId;

        const values = pokemonIds.map((pokeId, index) => [teamId, index + 1, pokeId]);

        const insertTeamPokemonsQuery =
          "INSERT INTO team_pokemons (team_id, slot, pokemon_id) VALUES ?";

        db.query(insertTeamPokemonsQuery, [values], (err) => {
          if (err) {
            console.error(err);
            return db.rollback(() => {
              return res.status(500).json({ error: "Erro ao salvar pokémons do time." });
            });
          }

          db.commit((err) => {
            if (err) {
              console.error(err);
              return db.rollback(() => {
                res.status(500).json({ error: "Erro ao finalizar transação." });
              });
            }

            return res.status(201).json({
              message: "Time salvo com sucesso!",
              id: teamId,
              userId,
              name: teamName,
              pokemonIds,
            });
          });
        });
      });
    });
  });
});



export default router;