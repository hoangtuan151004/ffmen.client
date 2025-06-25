"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "@/assets/logo.jpg";
import {
  faUserCircle,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"; 

const Header: React.FC = () => {
  return (
    <header className="bg-[#fafafa] sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-[5px] ">
        <Link href="/">
          <img src={logo.src} className="w-[50px] md:w-[70px]" alt="Logo" />
        </Link>

        <div className="hidden md:flex menu">
          <ul className="flex gap-[20px] md:gap-[42px] items-center text-black">
            <li>
              <Link
                className="hover:text-[#b31f2a] hover:underline decoration-2 decoration-[#b31f2a] transition-all"
                href="/"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#b31f2a] hover:underline decoration-2 decoration-[#b31f2a] transition-all"
                href="/product"
              >
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#b31f2a] hover:underline decoration-2 decoration-[#b31f2a] transition-all"
                href=""
              >
                Tin Tức
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#b31f2a] hover:underline decoration-2 decoration-[#b31f2a] transition-all"
                href="/contact"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex gap-[15px] md:gap-[25px]">
          <Link href="">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-[20px] md:text-[25px] text-black hover:text-[#b31f2a]"
            />
          </Link>

          <Link className="hover:text-[#b31f2a]" href="/cart">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-[20px] md:text-[25px] text-black hover:text-[#b31f2a]"
            />
          </Link>
          <Link href="/login">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-[20px] md:text-[25px] text-black hover:text-[#b31f2a]"
            />
          </Link>
        </div>
      </div>

      {/* Menu cho mobile */}
      <div className="block md:hidden bg-white shadow-md">
        <ul className="flex justify-around py-2 text-black">
          <li>
            <Link className="hover:text-[#b31f2a]" href="/home">
              Trang chủ
            </Link>
          </li>
          <li>
            <Link className="hover:text-[#b31f2a]" href="/product">
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link className="hover:text-[#b31f2a]" href="">
              Tin Tức
            </Link>
          </li>
          <li>
            <Link className="hover:text-[#b31f2a]" href="">
              Liên hệ
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
