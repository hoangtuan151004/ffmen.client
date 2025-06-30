import { OrderResponse } from "../types/oder.types";
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
