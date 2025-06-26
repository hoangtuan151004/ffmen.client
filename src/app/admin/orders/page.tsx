"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { fetchCategories } from "../../../services/category.service";
import { Category } from "../../../types";
import { deleteCategory } from "@/services/category.service";
import axios from "axios";
const totalOrders: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState<string | null>(null);
  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  // Lấy token từ localStorage/sessionStorage
  const getAccessToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  // Fetch danh sách đơn hàng từ API backend
  const fetchOrders = async () => {
    try {
      const token = getAccessToken();

      const { data } = await axios.get(
        "http://localhost:3000/cart/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(data.orders);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const handleDeleteOrder = async (orderId: string) => {
    try {
      const token = getAccessToken();
      await axios.delete(`http://localhost:3000/cart/admin/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      alert("Đã xóa đơn hàng thành công!");
    } catch (err) {
      console.error(err.message);
      alert("Không thể xóa đơn hàng.");
    }
  };
  const calculateTotalPrice = () => {
    return orders.reduce((total, order) => total + order.totalPrice, 0);
  };
  return (
    <>
      <main className="pt-[60px] bg-gray-100">
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="record-header flex justify-center items-center mb-4">
            <Link href="">
              <h1 className="text-xl text-black">Quản Lý Người Dùng</h1>
            </Link>
          </div>

          {error && <p className="mb-4 text-red-500">{error}</p>}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full table-auto text-black">
              <thead className="bg-gray-200">
                <tr>
                  {[
                    "STT",
                    "Khách hàng",
                    "Sản phẩm",
                    "Số lượng",
                    "Tổng giá",
                    "Ngày đặt",
                    "Thao tác",
                  ].map((header) => (
                    <th key={header} className="py-2 px-4 text-left border-t">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <React.Fragment key={order.id}>
                      {/* Hàng chính của đơn hàng */}
                      <tr className="even:bg-gray-50 hover:bg-gray-100">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{order.userId?.username}</td>

                        {/* Sản phẩm */}
                        <td className="py-2 px-4">
                          {order.items.map((item) => (
                            <div key={item.productId} className="ml-2">
                              {item.name}
                            </div>
                          ))}
                        </td>

                        {/* Số lượng các sản phẩm */}
                        <td className="py-2 px-4">
                          {order.items.map((item) => (
                            <div key={item.productId} className="ml-2">
                              {item.quantity}
                            </div>
                          ))}
                        </td>

                        {/* Tổng giá của đơn hàng */}
                        <td className="py-2 px-4">
                          {formatCurrency(order.totalPrice)}
                        </td>

                        {/* Ngày đặt hàng */}
                        <td className="py-2 px-4">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>

                        {/* Actions */}
                        <td className="py-2 px-4 flex space-x-2">
                          <button
                            onClick={() => alert("Cập nhật đơn hàng")}
                            className="px-2 py-1 bg-blue-500 rounded text-white hover:bg-blue-600"
                          >
                            Cập nhật
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="px-2 py-1 bg-red-500 rounded text-white hover:bg-red-600"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td className="py-4 text-center text-gray-500">
                      Không có đơn hàng nào.
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

export default totalOrders;
