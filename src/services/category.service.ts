import { baseApi } from "./baseApi";
import {
  Category,
  CategoryListResponse,
  CreateOrUpdateCategoryResponse,
} from "@/types";

// ✅ Lấy tất cả danh mục
export const getAllCategories = async (
  page = 1,
  limit = 10
): Promise<CategoryListResponse> => {
  const res = await baseApi.get<CategoryListResponse>("/categories", {
    params: { page, limit },
  });
  return res.data;
};
// ✅ Hàm thêm/sửa danh mục có truyền token
export const createOrUpdateCategory = async (
  values: any,
  isEdit: boolean,
  token?: string
): Promise<Category> => {
  const url = isEdit ? `/categories/${values._id}` : `/categories`;

  const bodyData = { ...values };
  if (!bodyData.parentCategory) delete bodyData.parentCategory;

  try {
    const res = await baseApi.request<CreateOrUpdateCategoryResponse>({
      url,
      method: isEdit ? "PUT" : "POST",
      data: bodyData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data;
  } catch (error: any) {
    console.error("❌ Error in createOrUpdateCategory", error);
    throw new Error(error?.response?.data?.message || "Lỗi xử lý danh mục");
  }
};

// ✅ Xoá danh mục theo ID
export const deleteCategory = async (
  id: string
): Promise<{ success: boolean; message: string; data?: Category } | null> => {
  try {
    const res = await baseApi.delete<{
      success: boolean;
      message: string;
      data?: Category;
    }>(`/categories/${id}`);
    return res.data;
  } catch (error) {
    console.error("❌ Error deleting category", error);
    return null;
  }
};
