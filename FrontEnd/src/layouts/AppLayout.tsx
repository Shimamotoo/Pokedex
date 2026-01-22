import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

function AppLayout() {
  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Header />

      <main>
        <Toaster position="top-right" />
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
