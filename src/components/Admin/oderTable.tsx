import React, { useState } from "react";
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
import { IOrder } from "@/types/oder.types";
import OrderDetailAdmin from "./OrderDetailAdmin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateOrderStatus } from "../../services/oder.service";
import { useAuth } from "../../context/auth-context";
import toast from "react-hot-toast";

interface OrderTableProps {
  orders: IOrder[];
  onUpdateOrders: (updatedOrder: IOrder) => void;
}

const statusColorMap: Record<string, string> = {
  pending: "bg-gray-500 hover:bg-gray-600",
  confirmed: "bg-blue-500 hover:bg-blue-600",
  shipping: "bg-yellow-500 hover:bg-yellow-600",
  delivered: "bg-green-500 hover:bg-green-600",
  cancelled: "bg-red-500 hover:bg-red-600",
};

const OrderTable: React.FC<OrderTableProps> = ({ orders, onUpdateOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editOrder, setEditOrder] = useState<IOrder | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useAuth();
  const handleOpenPopup = (order: IOrder) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };
  const handleEditClick = (order: IOrder) => {
    setEditOrder(order);
    setNewStatus(order.status);
    setIsEditing(true);
  };

  return (
    <>
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
                        onClick={() => handleEditClick(order)} // 👈 thêm nè
                      >
                        <Pencil size={18} />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={async () => {
                          if (
                            order.status === "delivered" ||
                            order.status === "cancelled"
                          ) {
                            toast.error(
                              "Không thể huỷ đơn đã giao hoặc đã huỷ."
                            );
                            return;
                          }

                          try {
                            await updateOrderStatus(
                              order._id,
                              "cancelled",
                              token || ""
                            );
                            toast.success("Đã huỷ đơn hàng thành công.");
                            onUpdateOrders({
                              ...order,
                              status: "cancelled",
                            });
                          } catch (err) {
                            console.error("Lỗi huỷ đơn:", err);
                            toast.error("Huỷ đơn hàng thất bại!");
                          }
                        }}
                      >
                        <Trash2 size={18} />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-500 hover:text-green-700"
                        onClick={() => handleOpenPopup(order)}
                      >
                        <Eye size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-gray-500 py-4"
                >
                  Không có đơn hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog popup chi tiết */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          </DialogHeader>
          {selectedOrder && <OrderDetailAdmin order={selectedOrder} />}
        </DialogContent>
      </Dialog>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md w-full p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center mb-4">
              Chỉnh sửa trạng thái đơn hàng
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Trạng thái đơn hàng
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Chờ xác nhận</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="shipping">Đang giao</option>
                <option value="delivered">Đã giao</option>
              </select>
            </div>

            <Button
              onClick={async () => {
                if (!editOrder) return;
                if (
                  editOrder.status === "shipping" &&
                  (newStatus === "pending" || newStatus === "confirmed")
                ) {
                  toast.error(
                    "Không thể chuyển từ 'Đang giao' về 'Chờ xác nhận' hoặc 'Đã xác nhận'."
                  );
                  return;
                }

                try {
                  await updateOrderStatus(
                    editOrder._id,
                    newStatus,
                    token || ""
                  );

                  const updatedOrder: IOrder = {
                    ...editOrder,
                    status: newStatus as IOrder["status"],
                  };

                  onUpdateOrders(updatedOrder);
                  setIsEditing(false);
                  setEditOrder(null);
                } catch (err) {
                  console.error("Cập nhật trạng thái thất bại:", err);
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md transition"
            >
              Lưu thay đổi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderTable;
