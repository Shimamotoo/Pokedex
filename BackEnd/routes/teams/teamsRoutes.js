import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import db from "../../database/db.js";

const router = Router();

//CRIAR TIME
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
    return res
      .status(400)
      .json({ error: "Não pode ter Pokémon duplicado no time." });
  }

  const teamName = String(name).trim();
  const userId = req.user.id;

  const teamQuery = "SELECT id FROM teams WHERE user_id = ? AND name = ?";

  db.query(teamQuery, [userId, teamName], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao verificar nome do time." });
    }

    if (results.length > 0) {
      return res
        .status(409)
        .json({ error: "Nome do time já cadastrado para este usuário." });
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

        const values = pokemonIds.map((pokeId, index) => [
          teamId,
          index + 1,
          pokeId,
        ]);

        const insertTeamPokemonsQuery =
          "INSERT INTO team_pokemons (team_id, slot, pokemon_id) VALUES ?";

        db.query(insertTeamPokemonsQuery, [values], (err) => {
          if (err) {
            console.error(err);
            return db.rollback(() => {
              return res
                .status(500)
                .json({ error: "Erro ao salvar pokémons do time." });
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
              name: teamName,
              pokemonIds,
            });
          });
        });
      });
    });
  });
});

//AlTERAR TIME
router.put("/alterar/:teamId", authMiddleware, (req, res) => {
  const { teamId } = req.params;
  const { name, pokemonIds } = req.body;
  const userId = req.user.id;

  if (!name || String(name).trim().length === 0) {
    return res.status(400).json({ error: "Nome inválido." });
  }
  if (!Array.isArray(pokemonIds) || pokemonIds.length !== 6) {
    return res.status(400).json({ error: "O time precisa de 6 pokémons." });
  }

  const teamName = String(name).trim();

  const sqlUpdateName = "UPDATE teams SET name = ? WHERE id = ? AND user_id = ?";
  
  db.query(sqlUpdateName, [teamName, teamId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao atualizar nome." });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Time não encontrado ou sem permissão." });
    }

    const sqlDeletePokemons = "DELETE FROM team_pokemons WHERE team_id = ?";
    
    db.query(sqlDeletePokemons, [teamId], (err) => {
      if (err) return res.status(500).json({ error: "Erro ao remover pokémons antigos." });

      const values = pokemonIds.map((pokeId, index) => [teamId, index + 1, pokeId]);
      const sqlInsertPokemons = "INSERT INTO team_pokemons (team_id, slot, pokemon_id) VALUES ?";

      db.query(sqlInsertPokemons, [values], (err) => {
        if (err) return res.status(500).json({ error: "Erro ao inserir novos pokémons." });

        res.json({ 
          message: "Time atualizado com sucesso!", 
          teamId, 
          name: teamName 
        });
      });
    });
  });
});

//LISTAR TIMES
router.get("/listar", authMiddleware, (req, res) => {

  const userId = req.user.id;

  if(!userId){
    return res.status(400).json({ error: "Treinador não encontrado" });
  }

  const sqlQuery =`
    SELECT * FROM teams WHERE user_id = ?;
  `

  db.query(sqlQuery, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar os times." });
    }  
    
    res.json(results);
  });
});

//VISUALIZAR TIME
router.get("/visualizar/:teamId", authMiddleware, (req, res) => {
  const { teamId } = req.params;

  if(!teamId){
    return res.status(400).json({ error: "Time informado não encontrado." });
  }

  const sqlQuery = `
    SELECT * FROM team_pokemons WHERE team_id = ? ORDER BY slot;
  `
  db.query(sqlQuery, [teamId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar os time." });
    }  
    
    res.json(results);    
  });
});

//DELETAR TIME
router.delete("/deletar/:teamId", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const { teamId } = req.params;

  const sqlQuery =`
    DELETE FROM teams WHERE user_id = ? AND id = ?;
  ` 
  db.query(sqlQuery, [userId, teamId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao deletar o time." });
    }  
    
    return res.status(200).json({
      message:"Time deletado com sucesso!",
      teamId
    });     
  })
})



export default router;
