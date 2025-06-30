export interface IOrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  img: string;
  variant?: {
    [key: string]: string; // ví dụ: { size: "M", color: "Đen" }
  };
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
}

export interface IUserInfo {
  _id: string;
  fullName: string;
  email: string;
}

export interface IOrder {
  _id: string;
  user: IUserInfo;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: "COD" | "VNPay" | "Momo";
  shippingPrice: number;
  total: number;
  isPaid: boolean;
  isDelivered: boolean;
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  totalOrders: number;
  totalPages: number;
  currentPage: number;
  data: IOrder[];
}
