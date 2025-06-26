"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
const AdminPage: React.FC = () => {
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
  // Hàm lấy accessToken từ localStorage hoặc sessionStorage
  const accessTokenFuc = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setAccessToken(token);
    console.log("Access Token:", token);
  };

  useEffect(() => {
    accessTokenFuc();
  }, []);

  return (
    <>
      <main className=" bg-gray-100">
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
              <strong>2</strong>
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
              <strong>2</strong>
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
              <strong>1xxx</strong>
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
              <strong>2</strong>
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
              {/* 
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
              {/* <td className="py-2 px-6 truncate text-gray-600 text-sm">
                      {product.name}
                    </td> */}

              {/* Giá sản phẩm */}
              {/* <td className="py-2 px-6 text-gray-600 text-sm">
                      {formatCurrency(product.price)}
                    </td> */}

              {/* Hình ảnh */}
              {/* <td className="py-2 px-6">
                      <img
                        src={`http://localhost:3000/images/${product.img}`}
                        alt={product.name}
                        className="w-[100px] h-[100px] object-cover rounded-md"
                      />
                    </td> */}

              {/* Mô tả */}
              {/* <td className="py-2 px-6 text-gray-600 text-sm">
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </td> */}

              {/* Lượt xem */}
              {/* <td className="py-2 px-6 text-gray-600 text-sm">
                      <div className="flex items-center gap-2"> */}
              {/* Icon mắt */}
              {/* <svg
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
                ))} */}
              {/* </tbody> */}
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminPage;
