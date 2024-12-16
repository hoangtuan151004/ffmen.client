"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  addToCart,
} from "@/redux/slices/cartslice";
import { useMemo } from "react";
import "../globals.css";
import Link from "next/link";
import axios from "axios";
import { Data } from "../../types";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  price_2: number;
  quantity: number;
  img: string;
}

export default function Cart() {
  const cartItems = useSelector((state: any) => state.cart?.items) || [];
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false); // State kiểm soát popup
  const [product, setProduct] = useState<Data | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const total = useMemo(
    () =>
      cartItems.reduce(
        (total: number, item: CartItem) => total + item.price_2 * item.quantity,
        0
      ),
    [cartItems]
  );

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: CartItem
  ) => {
    const newQuantity = parseInt(e.target.value, 10);

    try {
      if (newQuantity >= 1 && newQuantity <= 100) {
        dispatch(
          updateCartItemQuantity({
            _id: item._id,
            quantity: newQuantity,
          })
        );
      } else if (newQuantity < 1) {
        throw new Error("Số lượng không thể nhỏ hơn 1.");
      } else if (newQuantity > 100) {
        throw new Error("Số lượng không thể lớn hơn 100.");
      }
    } catch (error) {
      alert(`Lỗi cập nhật số lượng: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchAccessToken = () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
          throw new Error("Không tìm thấy mã token. Vui lòng đăng nhập.");
        }
        setAccessToken(token);
      } catch (error) {
        console.error("Lỗi khi lấy mã token:", error.message);
      }
    };
    fetchAccessToken();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        throw new Error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      }

      if (!item || !item._id) {
        throw new Error("Sản phẩm không hợp lệ, vui lòng thử lại.");
      }

      const { _id, name, price, img, quantity } = item;

      const payload = {
        productId: _id,
        name,
        price,
        img: `http://localhost:3000/images/${img}`,
        quantity,
      };

      console.log("Payload gửi backend:", payload);

      await axios.post("http://localhost:3000/cart/add", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowPopup(true);
    } catch (error) {
      console.error("Thanh toán thất bại:", error.message);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };
  const closePopup = () => {
    setShowPopup(false);
    dispatch(clearCart()); // Reset giỏ hàng khi nhấn OK
  };
  return (
    <div className="container mx-auto p-4 text-black">
      {/* popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all scale-105">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎉 Đặt hàng thành công!
            </h2>
            <p className="text-gray-600 mb-4">
              Cảm ơn bạn đã mua sắm. Hẹn gặp lại bạn lần sau!
            </p>
            <button
              onClick={closePopup}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow transition-transform transform hover:scale-105"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="content-cart flex flex-col lg:flex-row gap-8">
        <div className="box-left w-full lg:w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 border-b border-gray-300">STT</th>
                <th className="py-2 border-b border-gray-300">Sản phẩm</th>
                <th className="py-2 border-b border-gray-300">Tên</th>
                <th className="py-2 border-b border-gray-300">Đơn giá</th>
                <th className="py-2 border-b border-gray-300">Số lượng</th>
                <th className="py-2 border-b border-gray-300">Thành tiền</th>
                <th className="py-2 border-b border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: CartItem, index: number) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td>
                    <img
                      src={`http://localhost:3000/images/${item.img}`}
                      alt="Product Image"
                      className="card-item-img w-[200px] py-2 px-4 text-center"
                    />
                  </td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.price}</td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      className="qty w-16 p-1 border rounded text-center"
                      min="1"
                      max="100"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item)}
                    />
                  </td>

                  <td className="py-2 px-4">{item.price * item.quantity}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => dispatch(removeFromCart(item._id))}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="btn-choice flex justify-between mt-4">
            <Link className="hover:text-[#b31f2a]" href="/">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
                <i className="fa-solid fa-angle-left"></i> Tiếp tục mua
              </button>
            </Link>

            {cartItems.map((item) => (
              <button
                key={item._id}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => handleAddToCart(item)}
              >
                Đặt hàng <i className="fa-solid fa-chevron-right"></i>
              </button>
            ))}
          </div>
        </div>

        <div className="box-right w-full lg:w-1/3 bg-gray-50 p-4 rounded-lg">
          <div className="voucher mb-4">
            <label htmlFor="voucher-code" className="block font-medium mb-1">
              Mã giảm giá
            </label>
            <input
              className="w-full p-2 border rounded mb-2"
              type="text"
              id="voucher-code"
              placeholder="Nhập mã giảm giá"
            />
            <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
              Nhập
            </button>
          </div>
          <div className="total text-gray-700">
            <div className="flex justify-between mb-2">
              <span>Giảm giá:</span>
              <span>0</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Tổng cộng:</span>
              <span id="sumMoney">{total}</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="paymentCheckbox"
                className="mr-2"
                required
              />
              <label htmlFor="paymentCheckbox">Thanh toán khi nhận hàng</label>
            </div>
          </div>
        </div>
      </div>

      <button
        className="btn-del-all bg-red-500 text-white px-4 py-2 rounded mt-6 hover:bg-red-600 transition"
        onClick={() => dispatch(clearCart())}
      >
        Xóa tất cả
      </button>

      <div className="foot text-center text-gray-600 mt-4">
        <i className="fa-solid fa-truck-fast"></i> Giao hàng miễn phí trong tuần
        này
      </div>
    </div>
  );
}
