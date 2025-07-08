"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IOrder } from "../../types/oder.types";

export default function OrderDetailAdmin({ order }: { order: IOrder }) {
  return (
    <Card className="w-full max-w-4xl mx-auto my-6">
      <CardHeader>
        <CardTitle>Chi tiết đơn hàng: {order._id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User info */}
        <section>
          <h3 className="font-semibold text-lg">👤 Người đặt hàng</h3>
          <p>
            <strong>Họ tên:</strong> {order.user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {order.user.email}
          </p>
        </section>

        {/* Shipping address */}
        <section>
          <h3 className="font-semibold text-lg">🚚 Địa chỉ giao hàng</h3>
          <p>
            <strong>Người nhận:</strong> {order.shippingAddress.fullName}
          </p>
          <p>
            <strong>SĐT:</strong> {order.shippingAddress.phone}
          </p>
          <p>
            <strong>Địa chỉ:</strong>{" "}
            {`${order.shippingAddress.address}, ${order.shippingAddress.ward}, ${order.shippingAddress.district}, ${order.shippingAddress.province}`}
          </p>
        </section>

        {/* Order Items */}
        <section>
          <h3 className="font-semibold text-lg">📦 Sản phẩm</h3>
          <div className="space-y-4">
            {order.orderItems.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-center border rounded-lg p-2"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  {item.variant && (
                    <p className="text-sm text-gray-500">
                      Màu: {item.variant.color}, Size: {item.variant.size}
                    </p>
                  )}

                  <p>Số lượng: {item.quantity}</p>
                  <p>Đơn giá: {item.price.toLocaleString()}đ</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Order Summary */}
        <section className="pt-4 border-t">
          <h3 className="font-semibold text-lg">💰 Thông tin thanh toán</h3>
          <p>
            <strong>Phương thức:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Phí ship:</strong> {order.shippingPrice.toLocaleString()}đ
          </p>
          <p>
            <strong>Tổng tiền:</strong>{" "}
            <span className="text-primary font-bold">
              {order.total.toLocaleString()}đ
            </span>
          </p>
          <div className="flex gap-4 mt-2">
            <Badge variant={order.isPaid ? "default" : "secondary"}>
              {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
            </Badge>
            <Badge variant={order.isDelivered ? "default" : "secondary"}>
              {order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}
            </Badge>
            <Badge>{order.status}</Badge>
          </div>
        </section>

        {/* Time */}
        <section>
          <p className="text-sm text-muted-foreground">
            Ngày tạo: {new Date(order.createdAt).toLocaleString("vi-VN")}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
