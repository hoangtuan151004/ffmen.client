"use client";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

  return (
    <div className="flex">
      <Sidebar isMenuOpen={isMenuOpen} />

      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{
          marginLeft: isMenuOpen ? 165 : 50,
        }}
      >
        <Header
          toggleMenu={() => setIsMenuOpen((prev) => !prev)}
          isMenuOpen={isMenuOpen}
        />

        <main className="flex bg-gray-100 p-4 pt-[60px] overflow-auto">
          <Toaster position="top-right" reverseOrder={false} />

          {children}
        </main>
      </div>
    </div>
  );
}
