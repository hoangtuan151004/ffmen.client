import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface OrderTableProps {
  orders: any[];
}
const statusColorMap: Record<string, string> = {
  pending: "bg-gray-500 hover:bg-gray-600",
  confirmed: "bg-blue-500 hover:bg-blue-600",
  shipping: "bg-yellow-500 hover:bg-yellow-600",
  delivered: "bg-green-500 hover:bg-green-600",
  cancelled: "bg-red-500 hover:bg-red-600",
};

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  return (
    <div className="rounded-md border w-full overflow-x-auto">
      <Table className="w-full min-w-[1000px] text-left table-fixed border-collapse border border-gray-200">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-center w-[50px]">STT</TableHead>
            <TableHead className="text-center">Khách hàng</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">SỐ sản phẩm</TableHead>
            <TableHead className="text-center hidden md:table-cell">
              Tổng tiền
            </TableHead>
            <TableHead className="text-center hidden md:table-cell">
              PT Thanh toán
            </TableHead>
            <TableHead className="text-center">Trạng thái</TableHead>
            <TableHead className="text-center">Thời gian</TableHead>
            <TableHead className="text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <TableRow key={order._id} className="hover:bg-gray-50">
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">
                  {order.user?.fullName || "Ẩn danh"}
                </TableCell>
                <TableCell className="text-center">
                  {order.user?.email || "-"}
                </TableCell>
                <TableCell className="text-center">
                  {order.orderItems.length}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {order.total.toLocaleString("vi-VN")} ₫
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {order.paymentMethod}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="default"
                    className={`${
                      statusColorMap[order.status] || "bg-gray-400"
                    } text-white`}
                  >
                    {order.status === "pending"
                      ? "Chờ xác nhận"
                      : order.status === "confirmed"
                      ? "Đã xác nhận"
                      : order.status === "shipping"
                      ? "Đang giao"
                      : order.status === "delivered"
                      ? "Đã giao"
                      : order.status === "cancelled"
                      ? "Đã huỷ"
                      : "Không rõ"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center text-sm">
                  {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center ">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-500 hover:text-green-700"
                    >
                      <Eye size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500 py-4">
                Không có đơn hàng nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
