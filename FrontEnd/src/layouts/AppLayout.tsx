import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function AppLayout() {
  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Header />
      
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
