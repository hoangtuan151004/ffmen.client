import { UserProps } from "./auth.types";
import { IProduct } from "./product.types";

export interface IOrderItem {
  id: string;
  productId: IProduct["_id"] | string;
  name: string;
  variant?: {
    size?: string;
    color?: string;
  };
  quantity: number;
  price: number;
  img: string;
}

/** Địa chỉ giao hàng */
export interface IShippingAddress {
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string; // chi tiết (số nhà, đường...)
}

/** Enum status đơn hàng */
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipping"
  | "delivered"
  | "cancelled";

/** Order lưu trong DB */
export interface IOrder {
  user: UserProps | string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: "COD" | "VNPay" | "Momo";
  shippingPrice: number;
  total: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
