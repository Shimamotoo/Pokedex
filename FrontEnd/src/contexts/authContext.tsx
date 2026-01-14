import { createContext } from "react";
import type { AuthContextData } from "../types/AuthContextData";

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);
