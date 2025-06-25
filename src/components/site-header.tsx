"use client";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { CommandMenu } from "./command-menu";
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
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const user = {
    name: "Minh",
    avatar: "/avatars/01.png", // hoặc ảnh từ DB
  };
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <MainNav />
          <MobileNav />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu />
            </div>
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
                  href="/Login"
                  className="items-center gap-1 rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground flex"
                >
                  <User2Icon size={20} />
                  <span className="sr-only">Login</span>
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-52">
                    <DropdownMenuLabel className="text-sm">
                      Xin chào, {user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <UserIcon size={20} className="w-5 h-5" />
                        Hồ sơ
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/favorites"
                        className="flex items-center gap-2"
                      >
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
                      <Link href="/orders" className="flex items-center gap-2 ">
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
                      <Link
                        href="/settings"
                        className="flex items-center gap-2"
                      >
                        <SettingsIcon size={20} className="w-5 h-5"  />
                        Cài đặt
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => setIsLoggedIn(false)}
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
