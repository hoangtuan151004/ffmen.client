"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllUsers } from "@/services/user.service";
import { useAuth } from "../../../context/auth-context";
import UserTable from "../../../components/Admin/UserTable";
import { UserProps } from "@/types/auth.types";
import ReactPaginate from "react-paginate";
const User: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const { token } = useAuth();
  const [allUsers, setAllUsers] = useState<UserProps[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;

      try {
        const result = await getAllUsers(token);
        setAllUsers(result);

        // ✅ Tính lại pageCount sau khi có data
        setPageCount(Math.ceil(result.length / itemsPerPage));

        // ✅ Trang đầu tiên
        setUsers(result.slice(0, itemsPerPage));
      } catch (err) {
        console.error("Lỗi khi fetch user:", err);
      }
    };

    fetchUsers();
  }, [token]);
  const handlePageClick = (event: { selected: number }) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);

    const start = selectedPage * itemsPerPage;
    const end = start + itemsPerPage;
    setUsers(allUsers.slice(start, end));
  };

  return (
    <main className="min-h-screen p-6">
      <div className="records bg-white rounded-xl p-4 shadow-md">
        <div className="record-header flex justify-between items-center mb-4">
          <Link href="">
            <h1 className="text-xl text-black">Quản Lý Users</h1>
          </Link>
        </div>
        <div className="table-responsive overflow-auto rounded-md">
          <UserTable users={users} />
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="flex justify-end items-center mt-8 space-x-2 text-black"
            pageClassName="px-2 py-2 text-black bg-white border rounded-lg text-[12px]"
            previousLinkClassName="px-2 text-black py-2 bg-white text-black border rounded-lg text-[12px]"
            nextLinkClassName="px-2 py-2 text-black bg-white border rounded-lg text-[12px]"
            disabledClassName="opacity-50 cursor-not-allowed pointer-events-none text-black"
            activeClassName="px-3 py-2 text-gray-400 bg-indigo-600 rounded-lg"
            forcePage={currentPage}
          />
        </div>
      </div>
    </main>
  );
};

export default User;
