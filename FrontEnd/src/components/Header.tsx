import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinkBase = "px-3 py-1 transition-colors hover:text-indigo-400";

  const navLinkActive = "text-indigo-400 border-b-2 border-indigo-400";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleHome() {
    navigate("/home");
  }

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 bg-gray-800">
        <div className="text-xl font-bold cursor-pointer" onClick={handleHome}>
          Pokedex
        </div>

        <div className="text-sm">
          Bem-vindo,{" "}
          <span className="font-semibold"> {user?.name ?? "Treinador"} </span>
        </div>

        <div className="flex gap-4 text-sm">
          <button className="px-6 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
            Perfil
          </button>
          <button className="hover:text-red-400" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>
      <nav className="flex justify-center gap-8 py-4 text-sm bg-gray-700">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : ""}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/teambuilder"
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : ""}`
          }
        >
          TeamBuilder
        </NavLink>

        <NavLink
          to="/pokedex"
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : ""}`
          }
        >
          Pokédex
        </NavLink>

        <NavLink
          to="/daycare"
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : ""}`
          }
        >
          DayCare
        </NavLink>
      </nav>
    </>
  );
}

export default Header;
