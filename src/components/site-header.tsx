// src/components/site-header.tsx
"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeSwitcher } from "./mode-switcher";
import {
  HeartIcon,
  LogOutIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBasketIcon,
  User2Icon,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/context/auth-context";

export default function SiteHeader() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <MainNav />
          <MobileNav />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none"></div>
            <nav className="flex items-center gap-0.5">
              <Link
                href="/cart"
                target="_blank"
                rel="noreferrer"
                className="items-center gap-1 rounded-md p-2 text-sm relative font-medium transition-colors hover:bg-accent hover:text-accent-foreground flex"
              >
                <span className="absolute -top-1 -right-1 rounded-full bg-red-500 !text-white px-1 text-xs text-background">
                  1
                </span>
                <ShoppingBasketIcon size={20} />
                <span className="sr-only">Cart</span>
              </Link>

              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="items-center gap-1 rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground flex"
                >
                  <User2Icon size={20} />
                  <span className="sr-only">Login</span>
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar || ""} />
                      <AvatarFallback>
                        {user?.fullName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-52">
                    <DropdownMenuLabel className="text-sm">
                      Xin chào, {user?.fullName || "Người dùng"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <UserIcon size={20} />
                        Hồ sơ
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favorites" className="flex items-center gap-2">
                        <div className="relative">
                          <HeartIcon size={20} />
                          <span className="absolute -top-2 -right-1 rounded-full bg-red-500 !text-white px-1 text-xs text-background">
                            1
                          </span>
                        </div>
                        Yêu thích
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center gap-2">
                        <div className="relative">
                          <PackageIcon size={20} />
                          <span className="absolute -top-2 -right-1 rounded-full bg-red-500 !text-white px-1 text-xs text-background">
                            1
                          </span>
                        </div>
                        Đơn hàng
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center gap-2">
                        <SettingsIcon size={20} />
                        Cài đặt
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-500 flex items-center gap-2"
                    >
                      <LogOutIcon size={20} />
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <ModeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
