import { IOrder, OrderResponse } from "../types/oder.types";
import { baseApi } from "./baseApi";

// ✅ Truyền token làm tham số
export const getAllOrders = async (
  token: string,
  page = 1,
  limit = 10
): Promise<OrderResponse> => {
  const res = await baseApi.get(`/orders`, {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data as OrderResponse;
};
export const getOrderById = async (
  id: string,
  token: string
): Promise<IOrder> => {
  const res = await baseApi.get(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data as IOrder;
};

export const updateOrderStatus = async (
  id: string,
  status: string,
  token: string
): Promise<IOrder> => {
  const res = await baseApi.put(
    `/orders/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as IOrder;
};
