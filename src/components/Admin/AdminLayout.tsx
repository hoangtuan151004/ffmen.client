"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context"; 
import Sidebar from "./Sidebar";
import Header from "./Header";
import toast from "react-hot-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      toast.error("Bạn cần đăng nhập tài khoản admin để truy cập trang admin");
      router.replace("/login");
      return;
    }

    const isAdmin =
      user.role === "admin" || user.roles?.includes("admin");

    if (!isAdmin) {
      toast.error("Bạn không có quyền truy cập vào trang admin");
      router.replace("/");
    }
  }, [user]);

  if (!user) return null;

  return (
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
  );
};

export default AdminLayout;
