"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import AddOrEditCategoryPopup from "../../../components/Admin/categoryPopup";
import CategoryTable from "../../../components/Admin/categoryTable";
import { getAllCategories, deleteCategory } from "@/services/category.service";
import { Category } from "@/types";
import { createOrUpdateCategory } from "@/services/category.service";
import { useAuth } from "@/context/auth-context";
import ReactPaginate from "react-paginate";
const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const { token, user } = useAuth(); // 👈 lấy token và user từ context
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
  const fetchCategories = async (page = 1) => {
    try {
      const res = await getAllCategories(page, 10);
      setCategories(res.data);
      setPageCount(res.totalPages);
    } catch (err) {
      console.error("Lỗi khi lấy danh mục", err);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage + 1);
  }, [currentPage]);

  const handlePageClick = (e: { selected: number }) => {
    setCurrentPage(e.selected);
  };
  const handleSubmitCate = async (
    values: any,
    { setSubmitting, resetForm }: any,
    isEdit: boolean
  ) => {
    try {
      const category = await createOrUpdateCategory(
        values,
        isEdit,
        token ?? undefined
      );
      toast.success(isEdit ? "✅ Cập nhật thành công!" : "✅ Thêm thành công!");
      setCategories((prev) => {
        const newList = isEdit
          ? prev.map((c) => (c._id === category._id ? category : c))
          : [...prev, category];
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
    <main className=" space-y-2 p-2 w-full">
      <div className="records bg-white rounded-xl p-4 shadow-md">
        <div className="record-header flex justify-between items-center mb-4">
          <Link href="">
            <h1 className="text-xl text-black">Quản Lý Danh Mục</h1>
          </Link>
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

        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="flex justify-end items-center mt-8 space-x-2 text-black"
          pageClassName="px-2 py-2 text-black bg-white border rounded-lg text-[12px]"
          previousLinkClassName="px-2 text-black py-2 bg-white text-black border rounded-lg text-[12px]"
          nextLinkClassName="px-2 py-2 text-black bg-white border rounded-lg text-[12px]"
          disabledClassName="opacity-50 cursor-not-allowed pointer-events-none text-black"
          activeClassName="px-3 py-2 text-gray-400 bg-indigo-600 rounded-lg"
          forcePage={currentPage}
        />
      </div>
    </main>
  );
};
export default Categories;
