"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [items, setItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false); // State để hiển thị popup

  useEffect(() => {
    const cartItemsParam = searchParams.get("cartItems");
    const totalParam = searchParams.get("total");

    if (cartItemsParam && totalParam) {
      try {
        const parsedItems = JSON.parse(cartItemsParam);
        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
          const parsedTotal = parseFloat(totalParam);
          if (!isNaN(parsedTotal)) {
            setTotalPrice(parsedTotal);
          } else {
            console.error("Total price is not a valid number.");
          }
        } else {
          console.error("cartItems is not a valid array.");
        }
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, [searchParams]);

  // Xử lý khi nhấn nút Thanh toán
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true); // Hiển thị popup
    // Clear cart data and order information after payment
    setItems([]);
    setTotalPrice(0);

    // You can also clear cart data from the URL or localStorage if needed
    // router.push("/thank-you"); // Redirect to another page (e.g., thank you page)
  };

  // Đóng popup
  const closePopup = () => {
    setShowPopup(false);
    // Redirect after closing popup
    router.push("/"); // Navigate to the homepage or another page after closing
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <div className="content-checkout flex flex-col lg:flex-row gap-8">
        <div className="box-left w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Thông tin đơn hàng</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                  STT
                </th>
                <th className="py-3 px-4 border-b border-gray-300">Sản phẩm</th>
                <th className="py-3 px-4 border-b border-gray-300">Tên</th>
                <th className="py-3 px-4 border-b border-gray-300 text-right font-semibold">
                  Đơn giá
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                  Số lượng
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-right font-semibold">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, index: number) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-center">{index + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src={`http://localhost:3000/images/${item.img}`}
                      alt="Product Image"
                      className="w-[100px] h-[100px] object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4 text-right">{item.price}</td>
                  <td className="py-3 px-4 text-center">{item.quantity}</td>
                  <td className="py-3 px-4 text-right">
                    {item.price * item.quantity} {}VND
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total mt-4">
            <div className="flex justify-between mb-2">
              <span>Tổng cộng:</span>
              <span>{totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="box-right w-full lg:w-1/3 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Thông tin thanh toán</h3>
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2">
                Địa chỉ giao hàng
              </label>
              <input
                type="text"
                id="address"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block mb-2">
                Phương thức thanh toán
              </label>
              <select id="paymentMethod" className="w-full p-2 border rounded">
                <option value="cash_on_delivery">
                  Thanh toán khi nhận hàng
                </option>
                <option value="online">Thanh toán trực tuyến</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Thanh toán
            </button>
          </form>
        </div>
      </div>

      {/* Popup Thanh toán thành công */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Thanh toán thành công!
            </h2>
            <p className="mb-4">Cảm ơn bạn đã mua hàng.</p>
            <button
              onClick={closePopup}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
