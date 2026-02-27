//TO-DO Fazer a tela de alterar
import { ChevronRight, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDeleteTeam, useGetTeam, useTeamsList } from "../hooks/useTeams";
import toast from "react-hot-toast";
import type { PokemonCardData } from "../types/Pokemon";
import { pokemonService } from "../services/pokemonService";
// import { useNavigate } from "react-router-dom";

const typeHex: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function Teams() {
  // const navigate = useNavigate();
  const { teams, fetchTeams, status } = useTeamsList();
  const { fetchTeam } = useGetTeam();
  const { deleteTeam } = useDeleteTeam();

  const [teamToDelete, setTeamToDelete] = useState<number | null>(null);
  const [teamToView, setTeamToView] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  // function handleAlterTeam(id: number){
  //   navigate("/home")
  // }

  async function handleOpenViewModal(id: number){
    try {
      setTeamToView(id);
      const teamData = await fetchTeam(id);
      const pokeIds = teamData.map((pokemon) => pokemon.pokemon_id);
      const details = await pokemonService.getPokemonsByIds(pokeIds);
      setPokemons(details);
    } catch (error) {
      toast.error("Erro ao carregar pokémons do time");
      console.error(error);
    }
  }

  function handleOpenDeleteModal(id: number) {
    setTeamToDelete(id);
  }

  async function handleConfirmDeleteTeam() {
    if (teamToDelete === null) return;

    try {
      setIsDeleting(true);
      await deleteTeam(teamToDelete);
      await fetchTeams();
      toast.success("Time deletado");
    } catch(err) {
      toast.error("Erro ao deletar time");
      throw err
    } finally {
      setIsDeleting(false);
      setTeamToDelete(null);
    }
  }

  function handleCloseModal() {
    if (isDeleting) return;
    setTeamToDelete(null);
    setTeamToView(null)
  }

  if (status === "loading") {
    return <div>Buscando seu time...</div>;
  }

  if (status === "error") {
    return <p>Ops! Houve um erro ao carregar os times.</p>;
  }

  return (
    <div className="min-h-screen">
      <section>
        <div className="flex justify-end p-3">
          <div className="p-3 bg-gray-800 border border-gray-700 rounded-md">
            Total de times: <span className="font-bold"> {teams.length} </span> / 5
          </div>
        </div>
      </section>

      <section>
        <div className="p-3">
            {teams.length === 0 ? (
              <p>Você ainda não possui nenhum time</p>
            ) : (
              <div>
                {teams.map((team) => (
                  <div key={team.id} className="flex justify-between p-5 mt-3 bg-gray-800 border border-gray-700 rounded-md">
                    <div>{team.name}</div>
                    <div className="flex gap-2">
                      <div onClick={() => handleOpenDeleteModal(team.id)} className="content-center p-3 bg-gray-800 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-700/85">
                        <Trash2 size={20} color="red" />
                      </div>
                      <div onClick={() => handleOpenDeleteModal(team.id)} className="content-center p-3 bg-gray-800 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-700/85">
                        <SquarePen size={20} />
                      </div>
                      <div className="p-3 cursor-pointer" onClick={() => handleOpenViewModal(team.id)}>
                        <ChevronRight size={25} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          
        </div>
      </section>

      {teamToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Confirmar exclusão</h2>
            <p className="mb-6 text-sm text-gray-300">
              Deseja realmente deletar este time? Essa ação não pode ser desfeita.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteTeam}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 disabled:opacity-60"
              >
                {isDeleting ? "Deletando..." : "Deletar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {teamToView !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[50%] p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
            <div>
              { pokemons.map((pokemon) => (
                <div key={pokemon.id}>
                  <div className="flex w-full mb-2 bg-gray-700 border border-gray-700 rounded-lg shadow-lg">
                    <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20"/>
                    <div>
                      <p className="font-semibold text-white capitalize">{ pokemon.name }</p>
                      <ul className="flex gap-1 mt-2">
                        {pokemon.types.map((rawType) => {
                          const key = rawType.trim().toLowerCase();
                          const bg = typeHex[key] ?? "#9CA3AF";

                          return (
                            <li
                              key={`${pokemon.id}-${key}`}
                              style={{ backgroundColor: bg }}
                              className="py-[2px] px-[8px] text-xs capitalize text-white rounded-full"
                            >
                              {rawType}
                            </li>
                          );
                        })}
                      </ul>                    
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-60"
              >
                Cancelar
              </button>
            </div>            
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
