import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Tag,
  ShoppingCart,
  Mail,
  ClipboardList,
  Menu,
} from "lucide-react";
import logo from "@/assets/images/logo.jpg";
interface SidebarProps {
  isMenuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMenuOpen }) => {
  return (
    <div
      className="fixed top-0 left-0 h-full bg-white  border-shadow shadow-md text-gray-400 transition-all duration-300 z-[60] flex flex-col"
      style={{
        width: isMenuOpen ? 165 : 50,
      }}
    >
      <div
        className={`flex items-center p-2 border-b border-gray-400 transition-all duration-300 ${
          isMenuOpen ? "justify-start px-2" : "justify-center"
        }`}
      >
        <Link
          href="/"
          className={`flex items-center text-white transition-all duration-300 ${
            isMenuOpen ? "justify-start space-x-2 p-4" : "justify-center "
          }`}
        >
          <img src={logo.src} className="w-10 " alt="Logo" />
          {isMenuOpen && (
            <span className="text-2xl text-center text-gray-600">FFMen</span>
          )}
        </Link>
      </div>

      {/* Menu items */}
      <ul className="mt-4 space-y-4 text-center flex-1">
        <li className="hover:bg-blue-200 p-2">
          <Link
            href="/admin"
            className={`flex items-center text-gray-600 transition-all duration-300 ${
              isMenuOpen ? "justify-start space-x-2 px-2" : "justify-center"
            }`}
          >
            <LayoutDashboard className="w-6 h-6" />
            {isMenuOpen && <span className="text-sm">Dashboard</span>}
          </Link>
        </li>

        <li
          className={`hover:bg-blue-200 p-2 ${
            isMenuOpen ? "text-left px-2" : "text-center"
          }`}
        >
          <Link
            href="/admin/user"
            className={`flex items-center text-gray-600 ${
              isMenuOpen ? "justify-start space-x-2 px-2" : "justify-center"
            }`}
          >
            <User className="w-6 h-6" />
            {isMenuOpen && <span className="text-sm">User</span>}
          </Link>
        </li>

        <li className="hover:bg-blue-200 p-2">
          <Link
            href="/admin/categories"
            className={`flex items-center text-gray-600 ${
              isMenuOpen ? "justify-start space-x-2 px-2" : "justify-center"
            }`}
          >
            <Tag className="w-6 h-6" />
            {isMenuOpen && <span className="text-sm">Danh mục</span>}
          </Link>
        </li>
        <li className="hover:bg-blue-200 p-2">
          <Link
            href="/admin/proadmin"
            className={`flex items-center text-gray-600 ${
              isMenuOpen ? "justify-start space-x-2 px-2" : "justify-center"
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            {isMenuOpen && <span className="text-sm">Sản phẩm</span>}
          </Link>
        </li>
        {/* ... các menu khác */}
      </ul>
    </div>
  );
};

export default Sidebar;
