import type { PokemonCardData } from "../types/Pokemon";
import type {  TeamPayload } from "../types/TeamResponse";
import toast from "react-hot-toast";
import { useMemo, useState, useEffect } from "react";
import { PokemonsList } from "../components/PokemonsList";
import { usePokemons } from "../hooks/usePokemons";
import { useCreateTeam } from "../hooks/useTeams";
import {
  TEAM_SIZE,
  addPokemonToTeam,
  removePokemonFromTeam,
  isTeamComplete,
  buildSlots,
} from "../utils/team";

const TEAM_STORAGE_KEY = "pokedex:team";

function TeamBuilder() {

  const { status, createTeam } = useCreateTeam();

  const { pokemons, isLoading, error } = usePokemons(151);

  const [ sortBy, setSortBy ]  = useState<string>("id")

  const [team, setTeam] = useState<PokemonCardData[]>(() => {
    try {
      const raw = localStorage.getItem(TEAM_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [teamName, setTeamName] = useState<string>("");

  const [search, setSearch] = useState<string>("");

  const slots = useMemo(() => buildSlots(team, TEAM_SIZE), [team]);
  
  const isDisabled = teamName.trim().length === 0 || !isTeamComplete(team, TEAM_SIZE);

  function handleRemovePokemon(pokemonId: number) {
    setTeam((prev) => removePokemonFromTeam(prev, pokemonId));
  }

  const SortedPokemons = useMemo(() => {
    const term = search.trim().toLowerCase();

    let list = pokemons;

    if (term) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(term),
      );
    }

    return [...list].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      return a.id - b.id;
    });
  }, [pokemons, search, sortBy]);

  function handleAddToTeam(pokemon: PokemonCardData) {
    setTeam((prev) => {
      const result = addPokemonToTeam(prev, pokemon, TEAM_SIZE);

      if (!result.ok) {
        if (result.reason === "FULL") {
          toast.error(`Seu time já tem ${TEAM_SIZE} Pokémon`);
        } else {
          toast("Esse Pokémon já está no time", { icon: "⚠️" });
        }
        return prev;
      }

      return result.team;
    });
  }

  async function handleCreateTeam() {
    if (!teamName.trim() || !isTeamComplete(team, TEAM_SIZE)) return;

    const payload:  TeamPayload = {
      name: teamName.trim(),
      pokemonIds: team.map((p) => p.id),
    };

    try {
      await createTeam(payload);
      toast.success("Time salvo!");
      setTeam([]);
      setTeamName("");
    } catch(error) {
      toast.error("Erro ao salvar");
      console.error(error)
    }
  }

  function handleClearTeam() {
    setTeam([]);
  }

  useEffect(() => {
    try {
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(team));
    } catch (e) {
      console.error("Erro ao salvar team no localStorage", e);
    }
  }, [team]);  

  return (
    <div className="w-full px-4 py-3">
      <section className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">TeamBuilder</h1>
          <p className="text-sm text-gray-300">Monte seu time de {TEAM_SIZE} Pokémons.</p>
        </div>

        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-md outline-none focus:border-indigo-500"
          placeholder="Digite o nome (ex: Meu Time)"
        />

        <div className="flex items-center gap-3">
          <div className="px-3 py-2 text-sm text-gray-200 bg-gray-800 border border-gray-700 rounded-md">
            Time: <span className="font-semibold">{team.length}</span>/{TEAM_SIZE}
          </div>

          <button
            type="button"
            onClick={handleCreateTeam}
            className={`px-5 py-2 font-semibold rounded-md transition-all ${
              isDisabled
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
            disabled={isDisabled || status === "loading"}
          >
            {status === "loading" ? "Salvando..." : "Salvar"}
          </button>

          <button
            type="button"
            onClick={handleClearTeam}
            className="px-5 py-2 font-semibold bg-red-500 rounded-md hover:bg-red-400"
          >
            Limpar
          </button>
        </div>
      </section>

      <section className="sticky z-20 p-4 mb-6 bg-gray-800 border border-gray-700 rounded-lg top-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {slots.map((slot, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-900 border border-gray-700 rounded-lg"
            >
              {slot ? (
                <>
                  <img
                    src={slot.image}
                    alt={slot.name}
                    className="object-contain w-24 h-24 bg-gray-800 border border-gray-700 rounded-xl"
                  />

                  <div className="text-sm text-gray-200 capitalize">
                    {slot.name}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemovePokemon(slot.id)}
                    className="px-2 py-1 text-xs text-red-200 border border-red-800 rounded-md bg-red-900/30 hover:bg-red-900/50"
                  >
                    Remover
                  </button>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-gray-800 border border-gray-700 rounded-xl" />
                  <div className="text-sm text-gray-400">Slot Vazio</div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block mb-2 text-sm text-gray-300"
            >
              Buscar Pokémon
            </label>

            <div className="relative">
              <input
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Digite o nome (ex: pikachu)"
                className="w-full p-3 pr-10 text-white bg-gray-800 border border-gray-700 rounded-md outline-none focus:border-indigo-500"
              />

              <span className="absolute text-3xl text-gray-400 right-3 top-1">⌕</span>
            </div>
          </div>

          <div className="w-full sm:w-64">
            <label className="block mb-2 text-sm text-gray-300">
              Ordenação
            </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "id" | "name")} className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-md outline-none focus:border-indigo-500">
              <option value="id">Número (padrão)</option>
              <option value="name">Nome (A-Z)</option>
            </select>
          </div>
        </div>
      </section>

      <section className="p-4 bg-gray-800 border border-gray-700 rounded-lg ">
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
            pokemonsList={SortedPokemons}
            onSelectPokemon={handleAddToTeam}
          />
        )}
      </section>
    </div>
  );
}

export default TeamBuilder;
