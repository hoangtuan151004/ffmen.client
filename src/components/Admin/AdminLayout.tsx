"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/types/auth.types";
import { AuthProvider } from "@/context/auth-context";
import Sidebar from "./Sidebar";
import Header from "./Header";
import toast from "react-hot-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
  token: string | null;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, token }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const router = useRouter();
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (!token) {
      toast.error("Bạn cần đăng nhập tài khoản admin để truy cập trang admin");
      router.replace("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("✅ Decoded token:", decoded);

      const isAdmin =
        decoded.role === "admin" || decoded.roles?.includes("admin");

      if (!isAdmin) {
        toast.error("Bạn không có quyền truy cập vào trang admin");
        router.replace("/");
        return;
      }

      setUser(decoded);
    } catch (err) {
      toast.error("Token không hợp lệ");
      router.replace("/login");
    }
  }, [token]);

  if (!user) return null; // hoặc <Loading />

  return (
    <AuthProvider token={token} user={user}>
      <div className="flex">
        <Sidebar isMenuOpen={isMenuOpen} />
        <div
          className="flex-1 flex flex-col min-h-screen transition-all duration-300"
          style={{ marginLeft: isMenuOpen ? 165 : 50 }}
        >
          <Header
            toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
          />
          <main className="flex bg-gray-100 p-4 pt-[60px] overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default AdminLayout;
