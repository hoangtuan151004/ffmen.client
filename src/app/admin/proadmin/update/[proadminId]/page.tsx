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
    _id?: string;
    name: string;
    price: number;
    description: string;
    categoryId: string;
    imgs?: { _id: string; url: string }[];
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { register, setValue, handleSubmit } = useForm<
    Product & { img?: FileList }
  >();
  const router = useRouter();
  const id = params.proadminId;

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setAccessToken(token);

    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      if (!accessToken) return;
      try {
        const res = await fetch(`http://localhost:3000/products/detail/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!res.ok) throw new Error("Không thể lấy thông tin sản phẩm");

        const data: Product = await res.json();
        setProduct(data);

        setValue("name", data.name);
        setValue("price", data.price);
        setValue("description", data.description);
        setValue("categoryId", data.categoryId);

        if (data.imgs && data.imgs.length > 0) {
          setPreviewImage(data.imgs[0].url);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    if (accessToken && id) getProduct();
  }, [accessToken, id, setValue]);

  const onSubmit: SubmitHandler<Product & { img?: FileList }> = async (
    data
  ) => {
    if (!accessToken) return alert("Token không tồn tại");

    try {
      // 1. Cập nhật thông tin sản phẩm
      const updateRes = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          description: data.description,
          category: data.categoryId,
        }),
      });

      if (!updateRes.ok)
        throw new Error("Cập nhật thông tin sản phẩm thất bại");

      // 2. Nếu có file ảnh mới thì gọi API riêng để cập nhật
      const file = data.img?.[0];
      const imgId = product?.imgs?.[0]?._id;

      if (file && imgId) {
        const formData = new FormData();
        formData.append("img", file);

        const uploadRes = await fetch(
          `http://localhost:3000/products/${id}/images/${imgId}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${accessToken}` },
            body: formData,
          }
        );

        if (!uploadRes.ok) throw new Error("Cập nhật ảnh thất bại");
      }

      alert("✅ Cập nhật sản phẩm thành công!");
      router.push("/admin/proadmin");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("❌ Có lỗi xảy ra khi cập nhật sản phẩm.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue("img", e.target.files);
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

            <div>
              <label className="block mb-2 text-gray-700 text-lg">Giá</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                {...register("price")}
                placeholder="Nhập giá sản phẩm"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 text-gray-700 text-lg">Mô tả</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                {...register("description")}
                placeholder="Nhập mô tả sản phẩm"
              ></textarea>
            </div>

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

            <div>
              <label className="block mb-2 text-gray-700 text-lg">
                Tải ảnh lên
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

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
