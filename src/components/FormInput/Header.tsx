"use client";
import React from "react";
import { Bell, LogOut, Mail, Menu, Search } from "lucide-react";

interface HeaderProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu, isMenuOpen }) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 h-[60px] flex justify-between items-center px-4 z-[50] transition-all duration-300 ${
        isMenuOpen ? "pl-[165px]" : "pl-[50px]"
      }`}
    >
      <div
        className={`flex items-center p-2 transition-all duration-300 ${
          isMenuOpen ? "justify-start px-2" : "justify-center"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="cursor-pointer text-3xl  hover:text-teal-400 transition-colors "
          aria-label="Toggle menu"
        >
          <div
            className={`flex items-center ${
              isMenuOpen
                ? "justify-start space-x-2 px-2"
                : "justify-center space-x-2 px-2 "
            }`}
          >
            <Menu className="w-9 h-9 text-gray-600 rounded-full bg-slate-100 shadow-lg p-2" />
            {isMenuOpen && <span className="text-xl"></span>}
          </div>
        </button>
      </div>

      <div className="header-menu flex items-center space-x-4 text-black ml-auto">
        <Search className="w-5 h-5" />
        <div className="notify-icon relative">
          <Mail className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full px-1">
            4
          </span>
        </div>
        <div className="notify-icon relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>
        <div className="user flex items-center space-x-1 cursor-pointer">
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
