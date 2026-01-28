import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoutes";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import Pokedex from "../pages/Pokedex";
import AppLayout from "../layouts/AppLayout";
import TeamBuilder from "../pages/TeamBuilder";
import DayCare from "../pages/DayCare";
import Teams from "../pages/Teams";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/teambuilder" element={<TeamBuilder />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/daycare" element={<DayCare />} />
          <Route path="/teams" element={<Teams />} />
        </Route>
      </Route>
    </Routes>
  );
}
