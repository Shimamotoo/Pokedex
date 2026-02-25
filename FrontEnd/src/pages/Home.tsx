import { useNavigate } from "react-router-dom";
import { useTeamsList } from "../hooks/useTeams";
import { useEffect } from "react";

function Home() {
    const { teams, fetchTeams, status } = useTeamsList();
  
    useEffect(() => {
      fetchTeams();
    }, [fetchTeams]);
  
  const navigate = useNavigate();

  function handleTeams() {
    navigate("/teams");
  }

  if (status === "loading") {
    return <div>...</div>;
  }

  if (status === "error") {
    return <p>???</p>;
  }  

  return (
    <div className="min-h-screen text-white bg-gray-900">
      {/* EVENTO PRINCIPAL */}
      <section className="flex flex-col items-center justify-center px-6 py-16 text-center bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">
          Um Pokémon selvagem apareceu!
        </h2>

        <p className="mb-6 text-gray-300">
          Você tem uma chance diária de tentar capturá-lo.
        </p>

        <button className="px-8 py-3 font-semibold bg-indigo-600 rounded-md hover:bg-indigo-500">
          Capturar
        </button>
      </section>

      {/* CARDS */}
      <section className="grid max-w-5xl grid-cols-1 gap-6 px-6 py-12 mx-auto sm:grid-cols-2">
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="mb-2 text-lg font-semibold">Pokémon capturados:</h3>
          <p className="text-2xl font-bold">23 / 151</p>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg cursor-pointer" onClick={handleTeams}>
          <h3 className="mb-2 text-lg font-semibold">Times:</h3>
          <span className="text-2xl font-bold"> {teams.length} </span>/5
        </div>

        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="mb-2 text-lg font-semibold">Próximo ovo:</h3>
          <p className="text-2xl font-bold">2h 14min</p>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="mb-2 text-lg font-semibold">Sequência diária:</h3>
          <p className="text-xl">???</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
