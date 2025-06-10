import axios from "axios";
import { baseApi } from "./index";

interface Category {
  [x: string]: any;
  Category: [];
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getAllCategory = async (
  response?: Category[] | null
): Promise<Category[] | null> => {
  try {
    const response = await baseApi.get<Category[]>("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching category", error);
    return null;
  }
};
// api/categories.ts

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error("Không lấy được danh mục");
    }
    const data = await response.json();
    return data; // Trả về dữ liệu
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const fetchCategoryById = async (id: string): Promise<any> => {
  try {
    return await axios.get(`${API_URL}/categories/${id}`);
  } catch (error) {
    console.error("Failed to get category:", error);
    throw error;
  }
};
export const fetchTotalCategories = async (accessToken: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/categories/total-categories`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.totalCategories;
  } catch (error) {
    console.error("Request failed:", error);
    throw new Error("Failed to fetch total categories");
  }
};

export const deleteCategory = async (
  id: string
): Promise<{ CategoryDelete: Category } | null> => {
  try {
    const response = await baseApi.delete(`/categories/${id}`);
    return response.data as { CategoryDelete: Category };
  } catch (error) {
    console.error("Error deleting category", error);
    return null;
  }
};
