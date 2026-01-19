import { useEffect, useState } from "react";
import type { PokemonCardData } from "../types/Pokemon";
import { pokemonService } from "../services/pokemonService";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Erro ao carregar pokémons.";
}

export function usePokemons(limit = 151) {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await pokemonService.getPokemonItem(limit);
        if (isMounted) setPokemons(data);
      } catch (error: unknown) {
        if (isMounted) setError(getErrorMessage(error));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { pokemons, isLoading, error };
}
