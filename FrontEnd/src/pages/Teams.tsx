import { ChevronRight, SquarePen, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useTeamsList } from "../hooks/useTeams";

function Teams() {
  const { teams, fetchTeams, status } = useTeamsList();

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

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
              <div className="p-5 bg-gray-800 border border-gray-700 rounded-md">
                {teams.map((team) => (
                  <div key={team.id} className="flex justify-between p-5 mt-3 bg-gray-800 border border-gray-700 rounded-md">
                    <div>{team.name}</div>
                    <div className="flex gap-2">
                      <div className="content-center p-3 bg-gray-800 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-700/85">
                        <Trash2 size={20} color="red" />
                      </div>
                      <div className="content-center p-3 bg-gray-800 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-700/85">
                        <SquarePen size={20} />
                      </div>
                      <div className="p-3 cursor-pointer">
                        <ChevronRight size={25} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          
        </div>
      </section>
    </div>
  );
}

export default Teams;
