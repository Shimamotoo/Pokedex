import { PokemonsList } from "../components/PokemonsList";
import { usePokemons } from "../hooks/usePokemons";

function Pokedex() {
  const { pokemons, isLoading, error } = usePokemons(151);

  if (isLoading) return <p className="flex justify-center p-6 text-lg text-gray-400">Carregando...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return(
    <div className="p-3">
      <PokemonsList pokemonsList={pokemons} />;
    </div>
    )
}

export default Pokedex;
