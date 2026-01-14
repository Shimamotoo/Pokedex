import { useState } from "react";
import { AuthContext } from "./authContext";
import { authService } from "../services/authService"; 
import type { User } from "../types/LoginResponse";
import type { ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};



export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("@auth:token");
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("@auth:user");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });

  const isAuthenticated = !!user;

  async function login(email: string, password: string) {
    const data = await authService.login(email, password);

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("@auth:token", data.token);
    localStorage.setItem("@auth:user", JSON.stringify(data.user));    
  }

  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("@auth:token");
    localStorage.removeItem("@auth:user");    
  }


  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

