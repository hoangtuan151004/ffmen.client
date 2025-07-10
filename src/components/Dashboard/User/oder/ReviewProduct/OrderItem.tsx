// components/OrderItem.tsx
import React from "react";
import Image from "next/image";
import { IOrderItem } from "@/types/order";

interface OrderItemProps {
  item: IOrderItem;
  onReviewClick: (orderItemId: string) => void;
}

export default function OrderItem({ item, onReviewClick }: OrderItemProps) {
  return (
    <div className="flex items-center gap-4 py-3 border-t first:border-t-0">
      <Image
        src={item.img}
        alt={item.name}
        className="object-cover rounded-md"
        width={64}
        height={64}
      />

      <div className="flex-1">
        <p className="dark:text-slate-200 font-medium text-gray-900">
          {item.name || "Sản phẩm không xác định"}
        </p>
        <p className="dark:text-slate-200 text-sm text-gray-600">
          Mã SP: {item.productId || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          Loại sản phẩm:{" "}
          {item.variant
            ? [
                item.variant.size && `Size: ${item.variant.size}`,
                item.variant.color && `Màu: ${item.variant.color}`,
              ]
                .filter(Boolean)
                .join(", ")
            : "N/A"}
        </p>
        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
      </div>
      <p className="dark:text-slate-200 text-gray-900 font-semibold">
        {Number(item.price).toLocaleString()}đ
      </p>
      <button
        className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
        onClick={() => onReviewClick(item.id)}
      >
        Đánh giá
      </button>
    </div>
  );
};

;
