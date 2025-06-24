import { ProductListResponse, IProduct } from "@/types";
import { baseApi } from "./baseApi";

// GET: Danh sách sản phẩm có phân trang
export const getAllProducts = async (
  page = 1,
  limit = 10
): Promise<ProductListResponse> => {
  const res = await baseApi.get<ProductListResponse>("/products", {
    params: { page, limit },
  });
  return res.data;
};
// services/product.service.ts
export const addProduct = async (formData: FormData): Promise<IProduct> => {
  const res = await baseApi.post<IProduct, FormData>(
    "/products/add",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

// PUT: Cập nhật sản phẩm (dạng FormData)
export const updateProduct = async (id: string, formData: FormData) => {
  try {
    const res = await baseApi.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

// DELETE: Xoá sản phẩm
type DeleteProductResponse = {
  success: boolean;
  message: string;
  data: IProduct;
};

export const deleteProduct = async (
  id: string
): Promise<DeleteProductResponse> => {
  try {
    const res = await baseApi.delete<DeleteProductResponse>(`/products/${id}`);

    if (!res.data.success) {
      throw new Error(res.data.message || "Xóa sản phẩm thất bại");
    }

    return res.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};
