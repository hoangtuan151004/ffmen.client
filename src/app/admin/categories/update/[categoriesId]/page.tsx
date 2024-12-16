"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Category } from "../../../../../types";
import { fetchCategories } from "@/api/categories";
import { useRouter } from "next/navigation";

interface Params {
  params: {
    categoriesId: string;
  };
}

const CategoriesUpdate: React.FC<Params> = ({ params }) => {
  interface CategoryForm {
    name: string;
    description: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { register, setValue, handleSubmit } = useForm<CategoryForm>();
  const id = params.categoriesId;
  const router = useRouter();

  // Lấy accessToken từ localStorage hoặc sessionStorage
  useEffect(() => {
    const fetchAccessToken = () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      setAccessToken(token);
    };
    fetchAccessToken();
  }, []);

  // Lấy danh mục từ API và gán vào form
  useEffect(() => {
    const getCategory = async () => {
      if (!accessToken) {
        console.error("Access token is missing!");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3000/categories/${params.categoriesId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch category: ${res.status}`);
        }

        const data: Category = await res.json();
        setCategory(data);

        // Gán giá trị vào form
        setValue("name", data.name);
        setValue("description", data.description);
      } catch (err) {
        console.error("Error fetching category:", err);
      }
    };

    if (params.categoriesId && accessToken) {
      getCategory();
    }
  }, [params.categoriesId, accessToken, setValue]);

  // Submit form
  const onSubmit: SubmitHandler<CategoryForm> = async (data) => {
    if (!accessToken) {
      alert("Token missing");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/categories/${params.categoriesId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Nếu API không nhận FormData, bạn cần gửi JSON
        }
      );
      // Log trạng thái và phản hồi
      const responseData = await res.json();
      console.log("Response Status:", res.status);
      console.log("Response Data:", responseData);

      if (!res.ok) {
        throw new Error("Cập nhật danh mục thất bại");
      }

      alert("Cập nhật danh mục thành công");
      router.push("/admin/categories");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl text-black">
        <h2 className="text-3xl font-bold text-center mb-8">
          Cập nhật danh mục
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tên danh mục */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Tên danh mục
            </label>
            <input
              id="name"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              type="text"
              {...register("name")}
              placeholder="Nhập tên danh mục"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium mb-2"
            >
              Mô tả danh mục
            </label>
            <textarea
              id="description"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              {...register("description")}
              placeholder="Nhập mô tả danh mục"
              rows={4}
            ></textarea>
          </div>

          {/* Nút Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition duration-300"
            >
              Cập nhật danh mục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoriesUpdate;
