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
      <main className=" bg-gray-100">
        <div className="records bg-white rounded-xl p-4 shadow-md">
          <div className="record-header flex justify-between items-center mb-4">
            <Link href="">
              <h1 className="text-xl text-black">Quản Lý Users</h1>
            </Link>

            <div className="browse flex items-center space-x-2">
              <input
                type="search"
                placeholder="Search"
                className="record-search border rounded p-1 text-gray-600"
              />
            </div>
          </div>

          <div className="table-responsive overflow-auto rounded-md">
            <table className="w-full text-left table-fixed  border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    STT
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Username
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Email
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Họ và tên
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
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
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                      {user.username}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                      {user.fullName}
                    </td>

                    {/* Hiển thị Role người dùng */}
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
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
    </>
  );
};

export default User;
