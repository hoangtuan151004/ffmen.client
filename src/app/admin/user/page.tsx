"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
const User: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [users, setUsers] = useState([]);

  const accessTokenFuc = () => {
    if (localStorage.getItem("token") === null) {
      setAccessToken(sessionStorage.getItem("token"));
      return;
    }
    setAccessToken(localStorage.getItem("token"));
  };

  useEffect(() => {
    accessTokenFuc();
    getAllUsers();
  }, []);
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const getAllUsers = async () => {
    try {
      // Lấy token từ localStorage hoặc sessionStorage
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/auth/all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Thêm token vào request header
        },
      });

      const users = await response.json();

      if (!response.ok) {
        throw new Error(users.message || "Failed to fetch users");
      }

      console.log(users);
      setUsers(users);
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
    }
  };

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css"
        />
      </head>
      <input type="checkbox" id="menu-toggle" className="hidden" />
      <div
        className={`sidebar fixed h-full w-[165px] bg-gray-800 transition-all duration-300 ${
          isMenuOpen ? "left-0" : "left-[-165px]"
        }`}
      >
        <div className="side-menu mt-8 space-y-2">
          <ul className="flex flex-col items-center text-center pt-[50px]">
            <li className="w-full p-3 hover:bg-gray-700">
              <Link
                href="/admin"
                className="flex flex-col items-center text-gray-400 hover:text-white"
              >
                <span className="text-2xl las la-tachometer-alt"></span>{" "}
                {/* Icon Dashboard mới */}
                <small>Dashboard</small>
              </Link>
            </li>

            <li className="w-full p-3 hover:bg-gray-700">
              <Link
                href="/admin/user"
                className="flex flex-col items-center text-gray-400 hover:text-white"
              >
                <span className="text-2xl las la-user-alt"></span>
                <small>User</small>
              </Link>
            </li>

            <li className="w-full p-3 hover:bg-gray-600 items-center">
              <Link
                href="/admin/categories"
                className="flex items-center text-gray-400 hover:text-white"
              >
                <div className="flex flex-col pl-[45px]">
                  <span className="text-2xl las la-tag"></span>
                  <small>Danh mục</small>
                </div>
              </Link>
            </li>

            {/* Đơn hàng */}
            <li className="w-full p-3 hover:bg-gray-700">
              <Link
                href="/admin/orders"
                className="flex flex-col items-center text-gray-400 hover:text-white"
              >
                <span className="text-2xl las la-box"></span>
                <small>Đơn hàng</small>
              </Link>
            </li>

            {/* Sản phẩm */}
            <li className="w-full p-3 hover:bg-gray-700">
              <Link
                href="/admin/proadmin"
                className="flex flex-col items-center text-gray-400 hover:text-white"
              >
                <span className="text-2xl las la-shopping-cart"></span>
                <small>Sản phẩm</small>
              </Link>
            </li>

            <li className="w-full p-3 hover:bg-gray-700">
              <Link
                href="/"
                className="flex flex-col items-center text-gray-400 hover:text-white"
              >
                <span className="text-2xl las la-home"></span> {/* Icon Home */}
                <small>Quay về trang chủ</small>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`main-content transition-all duration-300 ${
          isMenuOpen ? "ml-[165px]" : "ml-0"
        }`}
      >
        <header className="fixed left-0 top-0 right-0 h-[60px] bg-white shadow-md flex justify-between items-center px-4">
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer text-2xl las la-bars text-black"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          ></label>
          <div className="header-menu flex items-center space-x-4 text-black">
            <label className="text-2xl las la-search"></label>
            <div className="user flex items-center space-x-1 cursor-pointer">
              <span className="text-2xl las la-power-off text-red-500"></span>
              <button
                className="btn-logout"
                onClick={() => {
                  document.cookie = "token=; path=/; max-age=0";
                  window.location.href = "/login";
                }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </header>

        <main className="pt-[60px] bg-gray-100">
          <div className="records bg-white p-4 shadow-md">
            <div className="record-header flex justify-center items-center mb-4">
              <Link href="">
                <h1 className="text-xl text-black">Quản Lý Người Dùng</h1>
              </Link>
            </div>

            <div className="overflow-auto mt-4 bg-white rounded-lg shadow-md p-4">
              <table className="min-w-full w-full text-left border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-gray-600 font-medium border-b border-gray-300">
                      STT
                    </th>
                    <th className="py-3 px-4 text-gray-600 font-medium border-b border-gray-300">
                      Username
                    </th>
                    <th className="py-3 px-4 text-gray-600 font-medium border-b border-gray-300">
                      Email
                    </th>
                    <th className="py-3 px-4 text-gray-600 font-medium border-b border-gray-300">
                      Họ và tên
                    </th>
                    <th className="py-3 px-4 text-gray-600 font-medium border-b border-gray-300">
                      Quyền
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">
                        {user.username}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {user.fullName}
                      </td>

                      {/* Hiển thị Role người dùng */}
                      <td className="py-3 px-4 text-gray-600">
                        {user.roles || "Không có"}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-3 px-4 text-center text-gray-500 font-medium"
                      >
                        Không có người dùng nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default User;
