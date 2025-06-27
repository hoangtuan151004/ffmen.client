"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import AddOrEditCategoryPopup from "../components/categoryPopup";
import CategoryTable from "../components/categoryTable";

import { getAllCategories, deleteCategory } from "@/services/category.service";
import { Category } from "@/types";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [popupState, setPopupState] = useState<{
    show: boolean;
    isEdit: boolean;
    initData: any;
  }>({
    show: false,
    isEdit: false,
    initData: {
      name: "",
      icon: "",
      description: "",
      parentCategory: "",
    },
  });

  // Lấy token từ local/session
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setAccessToken(token);
  }, []);

  // Lấy danh sách danh mục
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err: any) {
        console.error("Lỗi lấy danh mục:", err.message);
      }
    })();
  }, []);

  // Thêm hoặc sửa danh mục
  const handleSubmitCate = async (
    values: any,
    { setSubmitting, resetForm }: any,
    isEdit: boolean
  ) => {
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `http://localhost:5000/api/categories/${values._id}`
        : "http://localhost:5000/api/categories";

      // Chuẩn hóa dữ liệu: nếu parentCategory rỗng thì xoá hẳn field này
      const bodyData = { ...values };
      if (!bodyData.parentCategory) delete bodyData.parentCategory;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Lỗi xử lý danh mục");

      toast.success(isEdit ? "✅ Cập nhật thành công!" : "✅ Thêm thành công!");

      // Cập nhật UI
      setCategories((prev) => {
        const newList = isEdit
          ? prev.map((c) => (c._id === data.data._id ? data.data : c))
          : [...prev, data.data];

        return newList.sort((a, b) => a.name.localeCompare(b.name));
      });

      resetForm();
      setPopupState((prev) => ({ ...prev, show: false }));
    } catch (error: any) {
      toast.error("❌ Lỗi khi xử lý danh mục!");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Mở popup edit
  const handleEdit = (cate: Category) => {
    setPopupState({
      show: true,
      isEdit: true,
      initData: {
        _id: cate._id,
        name: cate.name,
        icon: cate.icon,
        description: cate.description,
        parentCategory: cate.parentCategory || "",
      },
    });
  };

  // Xoá danh mục
  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="p-2">
        <p className="text-sm font-medium text-gray-800">
          Bạn có chắc chắn muốn xóa danh mục này không?
        </p>
        <div className="mt-3 flex justify-end space-x-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const result = await deleteCategory(id);
                if (result?.data) {
                  toast.success("Xoá danh mục thành công!");
                  setCategories((prev) => prev.filter((cat) => cat._id !== id));
                } else {
                  toast.error(result?.message || "Xoá không thành công!");
                }
              } catch (error) {
                toast.error("Lỗi khi xóa danh mục!");
                console.error(error);
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Xác nhận
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm"
          >
            Hủy
          </button>
        </div>
      </div>
    ));
  };

  return (
    <main className="bg-gray-100">
      <div className="records bg-white rounded-xl p-4 shadow-md">
        <div className="record-header flex justify-between items-center mb-4">
          <button
            onClick={() =>
              setPopupState({
                show: true,
                isEdit: false,
                initData: {
                  name: "",
                  icon: "",
                  description: "",
                  parentCategory: "",
                },
              })
            }
            className="bg-blue-400 text-white rounded px-3 py-1 hover:bg-blue-500"
          >
            Thêm Danh Mục
          </button>

          <Link href="">
            <h1 className="text-xl text-black">Quản Lý Danh Mục</h1>
          </Link>
        </div>

        <AddOrEditCategoryPopup
          show={popupState.show}
          onClose={() => setPopupState((prev) => ({ ...prev, show: false }))}
          onSubmit={handleSubmitCate}
          categories={categories}
          initialValues={popupState.initData}
          isEdit={popupState.isEdit}
        />

        <div className="table-responsive overflow-auto rounded-lg">
          <CategoryTable
            categories={categories}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </main>
  );
};

export default Categories;
