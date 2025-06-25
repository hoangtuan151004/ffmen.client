"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getAllCategories } from "@/services/category.service";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Category } from "@/types/category.types";
import { deleteCategory } from "@/services/category.service";

const Cateegories: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const accessTokenFuc = () => {
    if (localStorage.getItem("token") === null) {
      setAccessToken(sessionStorage.getItem("token"));
      return;
    }
    setAccessToken(localStorage.getItem("token"));
  };

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    getCategories();
  }, []);
  useEffect(() => {
    getAllCategories();
    accessTokenFuc();
  }, []);
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Hàm gọi API để thêm danh mục
  const addCategory = async (values: { name: string; description: string }) => {
    try {
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // Xử lý l��i nếu status không phải 2xx
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi khi thêm danh mục");
      }

      const data = await response.json();
      console.log("Danh mục đã được thêm:", data);
      return data;
    } catch (error) {
      // Xử lý lỗi
      console.error("Lỗi khi thêm danh mục:");
      throw error;
    }
  };
  const handleSubmitcate = async (
    values: {
      name: string;
      description: string;
    },
    {
      setSubmitting,
      resetForm,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetForm: () => void;
    }
  ) => {
    try {
      // Gọi API thêm danh mục
      await addCategory(values);
      alert("Thêm danh mục thành công!");
      resetForm(); // Reset form sau khi thêm thành công

      setShowPopup(false); // Đóng popup
    } catch (error) {
      alert("Đã xảy ra lỗi khi thêm danh mục!");
    } finally {
      setSubmitting(false); // Dừng trạng thái submitting
    }
  };

  const handleDelete = (id: string) => {
    toast(
      (t) => (
        <div className="p-2">
          <p className="text-sm font-medium text-gray-800">
            Bạn có chắc chắn muốn xóa danh mục này không?
          </p>
          <div className="mt-3 flex justify-end space-x-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Đóng confirm

                try {
                  const result = await deleteCategory(id);
                  console.log("✅ Kết quả xoá", result);
                  if (result?.data) {
                    toast.success("Xoá danh mục thành công!");
                    setCategories((prev) =>
                      prev.filter((cat) => cat._id !== id)
                    );
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
      ),
      {
        duration: 10000,
        position: "top-center",
      }
    );
  };

  return (
    <>
      <main className=" bg-gray-100">
        <div className="records bg-white rounded-xl p-4 shadow-md">
          <div className="record-header flex justify-between items-center mb-4">
            <div className="add flex items-center space-x-2">
              <div className="">
                {/* Nút để mở popup */}
                <button
                  onClick={() => setShowPopup(true)}
                  className=" bg-blue-400 text-white rounded px-3 py-1 hover:bg-blue-500"
                >
                  Thêm Danh Mục
                </button>

                {/* Nền mờ và nội dung popup */}
                <AnimatePresence>
                  {showPopup && (
                    <motion.div
                      key="overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="fixed inset-0 z-50 flex justify-end backdrop-blur-sm bg-black/40"
                      onClick={handleClosePopup}
                    >
                      <motion.div
                        key="popup"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                          type: "tween",
                        }}
                        className="bg-white w-full sm:w-[90%] md:w-[520px] lg:w-[700px] h-full shadow-xl relative flex flex-col overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={handleClosePopup}
                          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
                        >
                          &times;
                        </button>
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                          <Formik
                            initialValues={{
                              name: "",
                              icon: "",
                              description: "",
                              parentCategory: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmitcate}
                          >
                            {({ isSubmitting }) => (
                              <Form className="space-y-5">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Tên danh mục
                                  </label>
                                  <Field
                                    name="name"
                                    type="text"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nhập tên danh mục"
                                  />
                                  <ErrorMessage
                                    name="name"
                                    component="small"
                                    className="text-red-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Icon (URL)
                                  </label>
                                  <Field
                                    name="icon"
                                    type="text"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nhập đường dẫn icon (https://...)"
                                  />
                                  <ErrorMessage
                                    name="icon"
                                    component="small"
                                    className="text-red-500"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Mô tả
                                  </label>
                                  <Field
                                    as="textarea"
                                    name="description"
                                    rows={3}
                                    className="mt-1 block w-full text-gray-400 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nhập mô tả"
                                  />
                                  <ErrorMessage
                                    name="description"
                                    component="small"
                                    className="text-red-500"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Field
                                    as="select"
                                    name="parentCategory"
                                    className="form-control w-full text-gray-400 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="">
                                      Không có (danh mục cha)
                                    </option>
                                    {categories
                                      .filter((cat) => !cat.parentCategory) // chỉ lấy danh mục cha
                                      .map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                          {cat.name}
                                        </option>
                                      ))}
                                  </Field>
                                </div>

                                <div className="pt-2">
                                  <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-400 text-white rounded px-3 py-1 hover:bg-blue-500  transition duration-200 font-medium"
                                  >
                                    {isSubmitting
                                      ? "Đang thêm..."
                                      : "Thêm danh mục"}
                                  </button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <Link href="">
              <h1 className="text-xl text-black">Quản Lý Danh Mục</h1>
            </Link>

            <div className="browse flex items-center space-x-2">
              <input
                type="search"
                placeholder="Search"
                className="record-search border rounded p-1 text-gray-600"
              />
            </div>
          </div>

          <div className="table-responsive overflow-auto rounded-lg">
            <table className="w-full text-left table-fixed border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    STT
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Tên
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Icon
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Mô tả
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Danh mục cha
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories
                  .filter((cate: any) => !cate.parentCategory) // chỉ lấy cha
                  .map((parent: any, index: number) => {
                    // tìm con của danh mục này
                    const children = categories.filter(
                      (child: any) => child.parentCategory?._id === parent._id
                    );

                    return (
                      <React.Fragment key={parent._id}>
                        {/* Danh mục cha */}
                        <tr className="bg-gray-50 font-semibold">
                          <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                            {index + 1}
                          </td>
                          <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                            {parent.name}
                          </td>
                          <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                            {parent.icon ? (
                              <img
                                src={parent.icon}
                                alt="icon"
                                className="w-6 h-6"
                              />
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                            {parent.description}
                          </td>
                          <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                            —
                          </td>
                          <td className="py-3 px-4 border border-gray-300 text-sm">
                            <div className="flex space-x-2">
                              <Link
                                href={`/admin/categories/update/${parent._id}`}
                              >
                                <button className="text-blue-500 hover:text-blue-700">
                                  Sửa
                                </button>
                              </Link>
                              <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDelete(parent._id)}
                              >
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Danh mục con */}
                        {children.map((child: any) => (
                          <tr
                            key={child._id}
                            className="hover:bg-gray-100 transition duration-200"
                          >
                            <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                              {/* Bỏ số thứ tự cho con để tránh nhầm lẫn */}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                              ┗━━ {child.name}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                              {child.icon ? (
                                <img
                                  src={child.icon}
                                  alt="icon"
                                  className="w-6 h-6"
                                />
                              ) : (
                                "—"
                              )}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                              {child.description.length > 100
                                ? child.description.substring(0, 100) + "..."
                                : child.description}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                              {parent.name}
                            </td>
                            <td className="py-3 px-4 border border-gray-300 text-sm">
                              <div className="flex space-x-2">
                                <Link
                                  href={`/admin/categories/update/${child._id}`}
                                >
                                  <button className="text-blue-500 hover:text-blue-700">
                                    Sửa
                                  </button>
                                </Link>
                                <button
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => handleDelete(child._id)}
                                >
                                  Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}

                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-3 px-4 border border-gray-300 text-center text-sm text-gray-500"
                    >
                      Không có danh mục nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Cateegories;
