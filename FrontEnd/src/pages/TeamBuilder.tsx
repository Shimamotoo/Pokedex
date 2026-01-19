import { useMemo, useState } from "react";
import type { PokemonCardData } from "../types/Pokemon";
import { PokemonsList } from "../components/PokemonsList";
import { usePokemons } from "../hooks/usePokemons";

function TeamBuilder(){
  const { pokemons, isLoading, error } = usePokemons(151);
  const [ team, setTeam ] = useState<PokemonCardData[]>([]);
  const [search, setSearch] = useState("");

  const slots = Array.from({ length: 6 });

  function handleSelectTeam(pokemon:PokemonCardData){
    setTeam((prev) => [...prev, pokemon])
  }

  const filteredPokemons = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return pokemons;

    return pokemons.filter((p) => p.name.toLowerCase().includes(term));
  }, [pokemons, search]);  

    return(
    <div className="w-full px-4 py-3">
      <section className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">TeamBuilder</h1>
          <p className="text-sm text-gray-300">
            Monte seu time com até <span className="font-semibold">6</span>{" "}
            Pokémons.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-2 text-sm text-gray-200 bg-gray-800 border border-gray-700 rounded-md">
            Time: <span className="font-semibold">{team.length}</span>/6
          </div>

          <button className="px-5 py-2 font-semibold bg-indigo-600 rounded-md hover:bg-indigo-500">
            Salvar
          </button>
        </div>
      </section>


      <section className="p-4 mb-6 bg-gray-800 border border-gray-700 rounded-lg">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {slots.map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-900 border border-gray-700 rounded-lg"
            >
              <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-xl" />

              <div className="text-xs text-gray-400">slot vazio</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <label className="block mb-2 text-sm text-gray-300">
              Buscar Pokémon
            </label>

            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Digite o nome (ex: pikachu)"
                className="w-full p-3 pr-10 text-white bg-gray-800 border border-gray-700 rounded-md outline-none focus:border-indigo-500"
              />

              <span className="absolute text-gray-400 right-3 top-3">⌕</span>
            </div>
          </div>

          <div className="w-full sm:w-64">
            <label className="block mb-2 text-sm text-gray-300">
              Ordenação
            </label>
            <select className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-md outline-none focus:border-indigo-500">
              <option value="id">Número (padrão)</option>
              <option value="name">Nome (A-Z)</option>
            </select>
          </div>
        </div>
      </section>

      <section className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Pokémons</h2>
          <span className="text-sm text-gray-300">
            Selecione para adicionar ao time
          </span>
        </div>

        {isLoading && (
          <p className="text-sm text-gray-300">Carregando pokémons...</p>
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}

        {!isLoading && !error && (
          <PokemonsList
            pokemonsList={filteredPokemons}
            onSelectPokemon={handleSelectTeam}
          />
        )}
      </section>
    </div>
    )
}

export default TeamBuilder;