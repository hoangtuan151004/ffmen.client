// src/context/auth-context.tsx
"use client";
import { createContext, useContext } from "react";
import { AuthContextType, JwtPayload } from "../types/auth.types";

const AuthContext = createContext<AuthContextType>({ token: null, user: null });

export const AuthProvider = ({
  children,
  token,
  user,
}: {
  children: React.ReactNode;
  token: string | null;
  user: JwtPayload | null;
}) => {
  return (
    <AuthContext.Provider value={{ token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
