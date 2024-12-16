"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getProductHot } from "@/api/products";
import { fetchCategoryById } from "@/api/categories";
import { fetchTotalCategories } from "@/api/categories";
import { fetchTotalUsers } from "../../api/user";
const Admin: React.FC = () => {
  const [productHot, setProductHot] = useState<any>([]);
  const [statistics, setStatistics] = useState<any>({}); // Thống kê
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // Lấy thông tin thống kê và sản phẩm hot

  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  const fetchProductHot = async () => {
    const response = await getProductHot();
    setProductHot(response?.data.slice(0, 5));
  };
  // Hàm lấy accessToken từ localStorage hoặc sessionStorage
  const accessTokenFuc = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setAccessToken(token);
    console.log("Access Token:", token);
  };

  useEffect(() => {
    accessTokenFuc();
    fetchTotalProducts();
    fetchTotalUsers();
    fetchProductHot();
    fetchTotalRevenue();
    // fetchHotProductsAndStatistics(); // Gọi hàm lấy sản phẩm hot và thống kê khi component được mount
  }, []);

  const [totalProducts, setTotalProducts] = useState<number>(0);

  // Hàm lấy tổng số sản phẩm
  const fetchTotalProducts = async () => {
    try {
      const accessToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!accessToken) {
        console.error("Không tìm thấy access token.");
        return;
      }

      const { data } = await axios.get(
        "http://localhost:3000/products/total-products",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setTotalProducts(data.totalProducts);
      setStatistics({
        revenue: data.revenue,
        totalOrders: data.totalOrders,
      });
    } catch (error: unknown) {
      console.error(
        "Không thể lấy tổng số sản phẩm:",
        (error as Error).message
      );
    }
  };
  //lấy tổng số danh mục
  const [totalCategories, setTotalCategories] = useState<number>(0);

  const [totalUsers, setTotalUsers] = useState<number>(0);
  const fetchTotalUsers = async () => {
    try {
      const accessToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!accessToken) {
        console.error("Không tìm thấy access token.");
        return;
      }

      const { data } = await axios.get(
        "http://localhost:3000/api/auth/total-users",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Tổng số người dùng:", data.totalUsers);
      setTotalUsers(data.totalUsers);
    } catch (error) {
      console.error("Failed to get total users:", error);
    }
  };

  // Hàm lấy tổng số danh mục
  const fetchTotalCategories = async () => {
    try {
      const accessToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!accessToken) {
        console.error("Không tìm thấy access token.");
        return;
      }

      const { data } = await axios.get(
        "http://localhost:3000/categories/total-categories",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Response Total Categories:", data);
      setTotalCategories(data.totalCategories);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Không thể lấy tổng danh mục:", error.message);
      } else {
        console.error("Không thể lấy tổng danh mục:", (error as Error).message);
      }
    }
  };
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  const fetchTotalRevenue = async () => {
    try {
      const accessToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!accessToken) {
        console.error("Không tìm thấy access token.");
        return;
      }

      const { data } = await axios.get(
        "http://localhost:3000/cart/total-revenue",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Response từ backend:", data); // Debug

      if (data && data.totalRevenue !== undefined) {
        setTotalRevenue(data.totalRevenue);
      } else {
        console.error("Doanh thu không được trả về từ backend.");
      }
    } catch (error) {
      console.error("Không thể lấy doanh thu:", error);
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
        <div className="side-menu mt-8 space-y-2 ">
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
          {/* Thống kê */}
          <div className="flex gap-4 mb-6 mt-6">
            <Link
              href="/admin/proadmin"
              className="bg-white p-6 rounded-lg shadow-lg w-1/4 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Sản phẩm
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                <strong>{totalProducts}</strong>
              </p>
            </Link>
            <Link
              href="/admin/categories"
              className="bg-white p-6 rounded-lg shadow-lg w-1/4 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Danh mục
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                <strong>{totalCategories}</strong>
              </p>
            </Link>
            <Link
              href=""
              className="bg-white p-6 rounded-lg shadow-lg w-1/4 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Doanh thu
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                <strong>{formatCurrency(totalRevenue)}</strong>
              </p>
            </Link>
            <Link
              href="/admin/user"
              className="bg-white p-6 rounded-lg shadow-lg w-1/4 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Người dùng
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                <strong>{totalUsers}</strong>
              </p>
            </Link>
          </div>

          {/* Sản phẩm hot */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Sản phẩm hot
            </h3>

            <div className="overflow-auto">
              <table className="w-full table-fixed border-collapse border border-gray-200">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    {["STT", "Tên", "Giá", "Hình ảnh", "Mô tả", "Lượt xem"].map(
                      (header, idx) => (
                        <th
                          key={idx}
                          className="py-4 px-6 border-b border-gray-300 text-left text-sm font-medium"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {productHot.map((product: any, index: number) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-200 text-black hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-2 px-6 text-gray-600 text-sm">
                        {index + 1}
                      </td>

                      {/* Tên sản phẩm */}
                      <td className="py-2 px-6 truncate text-gray-600 text-sm">
                        {product.name}
                      </td>

                      {/* Giá sản phẩm */}
                      <td className="py-2 px-6 text-gray-600 text-sm">
                        {formatCurrency(product.price)}
                      </td>

                      {/* Hình ảnh */}
                      <td className="py-2 px-6">
                        <img
                          src={`http://localhost:3000/images/${product.img}`}
                          alt={product.name}
                          className="w-[100px] h-[100px] object-cover rounded-md"
                        />
                      </td>

                      {/* Mô tả */}
                      <td className="py-2 px-6 text-gray-600 text-sm">
                        {product.description.length > 100
                          ? product.description.substring(0, 100) + "..."
                          : product.description}
                      </td>

                      {/* Lượt xem */}
                      <td className="py-2 px-6 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          {/* Icon mắt */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path d="M2.458 12C3.732 7.943 7.525 5 12 5c4.475 0 8.268 2.943 9.542 7a9.83 9.83 0 0 1 0 4c-1.274 3.057-5.067 5-9.542 5-4.475 0-8.268-2.943-9.542-7a9.83 9.83 0 0 1 0-4z" />
                          </svg>
                          {product.view}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Admin;
