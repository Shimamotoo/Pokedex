import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
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

  const uniqueCount = new Set(pokemonIds).size;
  if (uniqueCount !== pokemonIds.length) {
    return res.status(400).json({ error: "Não pode ter Pokémon duplicado no time." });
  }

  return res.status(200).json({ message: "Time salvo com sucesso!", name: String(name).trim(), pokemonIds });
});


export default router;