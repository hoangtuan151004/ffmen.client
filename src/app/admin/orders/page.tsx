"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "../../../services/oder.service";
import OrderTable from "../../../components/Admin/oderTable";
import { IOrder } from "../../../types/oder.types";
import { useAuth } from "../../../context/auth-context";
import Link from "next/link";
import ReactPaginate from "react-paginate";

export default function OrderPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [page, setPage] = useState(0); // 👈 ReactPaginate dùng page index (bắt đầu từ 0)
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const data = await getAllOrders(token, page + 1, 10); // 👈 Chuyển page index (0-based) => 1-based
        setOrders(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, token]);
  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected);
  };

  return (
    <main className="bg-gray-100 space-y-2 p-2 w-full">
      <div className="records bg-white rounded-xl p-4 shadow-md">
        <div className="record-header flex justify-between items-center mb-4">
          <Link href="/admin/orders">
            <h1 className="text-xl text-black font-semibold">
              Quản lý đơn hàng
            </h1>
          </Link>
        </div>

        <OrderTable orders={orders} />

        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="flex justify-end items-center mt-8 space-x-2 text-black"
          pageClassName="px-2 py-2 text-black bg-white border rounded-lg text-[12px]"
          previousLinkClassName="px-2 text-black py-2 bg-white text-black border rounded-lg text-[12px]"
          nextLinkClassName="px-2 py-2 text-black bg-white border rounded-lg text-[12px]"
          disabledClassName="opacity-50 cursor-not-allowed pointer-events-none text-black"
          activeClassName="px-3 py-2 text-gray-400 bg-indigo-600 rounded-lg"
          forcePage={page}
        />
      </div>
    </main>
  );
}
