"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Category } from "../../../../../types";
import { fetchCategories } from "@/api/categories";
import { useRouter } from "next/navigation";

interface Params {
  params: {
    proadminId: string;
  };
}

const ProductUpdate: React.FC<Params> = ({ params }) => {
  interface Product {
    name: string;
    price: number;
    description: string;
    categoryId: string;
    img?: string | FileList;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { register, setValue, handleSubmit } = useForm<Product>();
  const router = useRouter();
  const id = params.proadminId;

  useEffect(() => {
    // Lấy token từ localStorage hoặc sessionStorage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setAccessToken(token);

    const init = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    init();
  }, []);

  useEffect(() => {
    // Gọi API lấy thông tin sản phẩm
    const getProduct = async () => {
      if (!accessToken) return;

      try {
        const res = await fetch(
          `http://localhost:3000/products/detail/${params.proadminId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!res.ok) throw new Error("Không thể lấy thông tin sản phẩm");
        const data: Product = await res.json();
        setProduct(data);

        // Set giá trị cho form
        setValue("name", data.name);
        setValue("price", data.price);
        setValue("description", data.description);
        setValue("categoryId", data.categoryId);

        // Xử lý ảnh preview nếu có
        if (data.img && typeof data.img === "string") {
          setPreviewImage(`http://localhost:3000/images/${data.img}`);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    if (params.proadminId && accessToken) getProduct();
  }, [params.proadminId, accessToken, setValue]);

  const onSubmit: SubmitHandler<Product> = async (data) => {
    if (!accessToken) {
      alert("Token missing");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price ? data.price.toString() : "0");
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);

    const imageFile = data.img instanceof FileList ? data.img[0] : null;
    if (imageFile) {
      formData.append("img", imageFile);
    }

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Cập nhật sản phẩm thất bại");
      alert("Cập nhật sản phẩm thành công");
      router.push("/admin/proadmin");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg text-black">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Cập nhật Sản phẩm
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Tên Sản phẩm */}
            <div>
              <label className="block mb-2 text-gray-700 text-lg">
                Tên sản phẩm
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                {...register("name")}
                placeholder="Nhập tên sản phẩm"
              />
            </div>

            {/* Giá */}
            <div>
              <label className="block mb-2 text-gray-700 text-lg">Giá</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                {...register("price")}
                placeholder="Nhập giá sản phẩm"
              />
            </div>

            {/* Mô tả */}
            <div className="col-span-2">
              <label className="block mb-2 text-gray-700 text-lg">Mô tả</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                {...register("description")}
                placeholder="Nhập mô tả sản phẩm"
              ></textarea>
            </div>

            {/* Danh mục */}
            <div>
              <label className="block mb-2 text-gray-700 text-lg">
                Danh mục
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("categoryId")}
                defaultValue={product?.categoryId}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tải ảnh */}
            <div>
              <label className="block mb-2 text-gray-700 text-lg">
                Tải ảnh lên
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="file"
                accept="image/*"
                {...register("img")}
                onChange={(e) => handleImageChange(e)}
              />
            </div>
          </div>

          {/* Xem trước ảnh */}
          <div className="mt-6">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg mx-auto border"
              />
            ) : (
              <p className="text-gray-500 text-center mt-2">Chưa chọn ảnh</p>
            )}
          </div>

          {/* Nút Submit */}
          <button
            type="submit"
            className="mt-6 w-full bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Cập nhật sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdate;
