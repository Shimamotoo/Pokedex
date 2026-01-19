import { PokemonsList } from "../components/PokemonsList";
import { usePokemons } from "../hooks/usePokemons";

function Pokedex() {
  const { pokemons, isLoading, error } = usePokemons(151);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return <PokemonsList pokemonsList={pokemons} />;
}

export default Pokedex;
