import { baseApi } from "./baseApi";
import { Category } from "@/types";
interface GetCategoriesResponse {
  message: string;
  data: Category[];
}
// ✅ Lấy tất cả danh mục
export const getAllCategories = async (): Promise<Category[] | []> => {
  try {
    const res = await baseApi.get<GetCategoriesResponse>("/categories");
    return res.data?.data || []; // 👈 lấy đúng mảng `data`
  } catch (error) {
    console.error("❌ Error fetching categories", error);
    return [];
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
