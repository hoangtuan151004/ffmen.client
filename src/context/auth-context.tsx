// src/context/auth-context.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClientType, JwtPayload,  } from "@/types/auth.types";
import { logoutApi } from "@/services/Auth/auth.service";
import toast from "react-hot-toast";

const AuthContext= createContext<AuthClientType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: JwtPayload) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutApi(); // sẽ xóa cookie phía server (nếu cần)
      sessionStorage.removeItem("user");
      setUser(null);
      toast.success("Đăng xuất thành công");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Có lỗi khi đăng xuất");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
