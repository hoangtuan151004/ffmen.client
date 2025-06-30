"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserProps } from "../../types/auth.types";

interface UserTableProps {
  users: UserProps[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="rounded-md border w-full overflow-x-auto">
      <Table className="w-full min-w-[800px] text-left table-fixed border-collapse border border-gray-200">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="text-center w-[50px]">STT</TableHead>
            <TableHead className="text-center">Username</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Họ và tên</TableHead>
            <TableHead className="text-center hidden sm:table-cell">
              SĐT
            </TableHead>
            <TableHead className="text-center hidden sm:table-cell">
              Trạng thái
            </TableHead>
            <TableHead className="text-center">Quyền</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">
                  {user.fullName || "Chưa có"}
                </TableCell>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell className="text-center">{user.fullName}</TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  {user.phoneNumber || "Chưa cập nhật"}
                </TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  {user.isActive ? (
                    <span className="text-green-600 font-medium">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium">Khoá</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {user.roles?.length ? user.roles.join(", ") : "Không có"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                Không có người dùng nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
