"use client";

import { Bell, LogOut, Mail, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface HeaderProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu, isMenuOpen }) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include", // gửi cookie
        }
      );

      if (res.ok) {
        toast.success("Đăng xuất thành công 👋");
        router.push("/login");
      } else {
        toast.error("Đăng xuất thất bại 😓");
      }
    } catch (err) {
      toast.error("Lỗi khi đăng xuất ❌");
      console.error("Lỗi khi logout:", err);
    }
  };

  const avatarUrl = user?.avatar || "https://i.pravatar.cc/150?img=3"; // fallback ảnh
  const avatarFallback = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "??";

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-[50px] flex items-center px-4 bg-white border-b shadow-sm z-[39] transition-all duration-300 ${
        isMenuOpen ? "pl-[176px]" : "pl-[50px]"
      }`}
    >
      <Button variant="ghost" size="icon" onClick={toggleMenu}>
        <Menu className="h-6 w-6" />
      </Button>

      <div className="flex-1" />

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Search className="w-5 h-5" />
        </Button>

        <div className="relative">
          <Button variant="ghost" size="icon">
            <Mail className="w-5 h-5" />
          </Button>
          <Badge
            className="absolute -top-1 -right-1 px-[5px] py-[1px] text-[10px]"
            variant="destructive"
          >
            4
          </Badge>
        </div>

        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Badge
            className="absolute -top-1 -right-1 px-[5px] py-[1px] text-[10px]"
            variant="destructive"
          >
            3
          </Badge>
        </div>

        <Button
          variant="ghost"
          className="text-red-500 gap-1"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Logout</span>
        </Button>

        <Avatar>
          <AvatarImage src={avatarUrl} alt="user" />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
