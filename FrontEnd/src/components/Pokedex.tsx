import { useState, useEffect } from "react";
import { pokemonService } from "../service/pokemonService";
import type { PokemonCardData } from "../types/Pokemon";
import { PokemonsList } from "./PokemonsList";

export function Pokedex() {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      const data = await pokemonService.getPokemonItem();
      setPokemons(data);
    } catch (error) {
      console.error("Erro ao carregar os pokemons", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
        <div className="w-full min-h-screen font-sans bg-gray-800">
            <div className="flex justify-center p-6">
                <p className="text-white">Carregando...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="w-full min-h-screen font-sans bg-gray-800">
      <div className="max-w-[1600px] mx-auto p-3">
        <PokemonsList pokemonsList={pokemons} />
      </div>
    </div>
  );
}

export default Pokedex;