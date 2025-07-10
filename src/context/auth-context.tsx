"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClientType, JwtPayload } from "@/types/auth.types";
import { logoutApi } from "@/services/Auth/auth.service";
import toast from "react-hot-toast";

/**
 * Context mặc định, thêm updateUser
 */
const AuthContext = createContext<AuthClientType>({
  user: null,
  login: () => { },
  logout: () => { },
  updateUser: () => { },
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
      await logoutApi();
      sessionStorage.removeItem("user");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setUser(null);
      toast.success("Đăng xuất thành công");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Có lỗi khi đăng xuất");
    }
  };

  /**
   * ✅ Hàm update thông tin user (chỉ update các field cần thiết)
   */
  const updateUser = (updatedFields: Partial<JwtPayload>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updatedFields };
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success("Cập nhật thông tin thành công");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
