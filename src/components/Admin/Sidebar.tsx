"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, User, Tag, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import logo from "../../assets/logo.jpg";

interface SidebarProps {
  isMenuOpen: boolean;
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "User",
    href: "/admin/user",
    icon: User,
  },
  {
    label: "Danh mục",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    label: "Sản phẩm",
    href: "/admin/proadmin",
    icon: ShoppingCart,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isMenuOpen }) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-full bg-white border-r shadow-md transition-all z-40 flex flex-col",
        isMenuOpen ? "w-44" : "w-[50px]"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center border-b px-1 py-1",
          isMenuOpen ? "justify-start" : "justify-center"
        )}
      >
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" width={50} height={50} />
          {isMenuOpen && (
            <span className="text-lg font-semibold text-gray-700">FFMen</span>
          )}
        </Link>
      </div>

      <ul className="mt-4 space-y-2 flex-1 px-1">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center rounded-md hover:bg-blue-100 text-gray-700 text-sm font-medium px-2 py-2 transition-colors",
                isMenuOpen ? "justify-start space-x-2" : "justify-center"
              )}
            >
              <item.icon className="w-5 h-5" />
              {isMenuOpen && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      <Separator className="mt-auto" />
    </div>
  );
};

export default Sidebar;
