import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import Pokedex from "../pages/Pokedex";

export function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex/>}/>
    </Routes>
  );
}