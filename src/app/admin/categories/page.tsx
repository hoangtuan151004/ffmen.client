"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { fetchCategories } from "../../../api/categories";
import { Category } from "../../../types";
import { deleteCategory } from "@/api/categories";

const Cateegories: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
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
        const data = await fetchCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    getCategories();
  }, []);
  useEffect(() => {
    fetchCategories();
    accessTokenFuc();
  }, []);
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Hàm gọi API để thêm danh mục
  const addCategory = async (values: { name: string; description: string }) => {
    try {
      const response = await fetch("http://localhost:3000/categories/add", {
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

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      try {
        const result = await deleteCategory(id);

        if (result && result.CategoryDelete) {
          alert("Xóa danh mục thành công!"); // Hiển th�� thông báo từ server
        } else {
          alert("Xóa danh mục không thành công!");
        }

        // Gọi lại API để làm mới danh sách
        const updatedCategories = await fetchCategories();
        setCategories(updatedCategories);
      } catch (error) {
        alert("Lỗi khi xóa danh mục");
        console.error(error);
      }
    }
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
                  className=" text-[16px]rounded-md hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125 bg-[#FF5959] text-white rounded px-3 py-1"
                >
                  Thêm Danh Mục
                </button>

                {/* Nền mờ và nội dung popup */}
                {showPopup && (
                  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-[1000px] relative overflow-y-auto max-h-[90vh] pt-[50px] ">
                      {/* Nút đóng */}
                      <button
                        onClick={() => setShowPopup(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      >
                        &times;
                      </button>

                      {/* Nội dung của popup */}

                      <Formik
                        initialValues={{
                          name: "",
                          description: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitcate}
                      >
                        {({ setFieldValue, isSubmitting }) => (
                          <Form
                            id="formThemSanPham"
                            encType="multipart/form-data"
                          >
                            {/* Tên sản phẩm */}
                            <div className="mb-4">
                              <label
                                htmlFor="name"
                                className="block text-black mb-1"
                              >
                                Tên danh mục
                              </label>
                              <Field
                                name="name"
                                type="text"
                                className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên sản phẩm"
                              />
                              <ErrorMessage
                                name="name"
                                component="small"
                                className="text-red-500"
                              />
                            </div>

                            {/* Mô tả */}
                            <div className="mb-4">
                              <label
                                htmlFor="description"
                                className="block text-black mb-1"
                              >
                                Mô tả
                              </label>
                              <Field
                                as="textarea"
                                name="description"
                                className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập mô tả sản phẩm"
                              />
                              <ErrorMessage
                                name="description"
                                component="small"
                                className="text-red-500"
                              />
                            </div>

                            {/* Nút submit */}
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="bg-[#FF5959] rounded-[10px] w-[fit-content] px-[20px] py-[9px] hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125 "
                            >
                              Thêm
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                )}
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
            <table className="w-full  text-left table-fixed  border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    STT
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Tên
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Mô tả
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Thao tác
                  </th>
                </tr>
              </thead>
              {/* Body */}
              <tbody>
                {categories.map((category: any, index: number) => (
                  <tr
                    key={category._id}
                    className="even:bg-gray-50 hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                      {category.name}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                      {category.description.length > 100
                        ? category.description.substring(0, 100) + "..."
                        : category.description}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm">
                      <div className="flex space-x-2">
                        <Link
                          href={{
                            pathname: `/admin/categories/update/${category._id}`,
                          }}
                        >
                          <button
                            // onClick={() => handleEditProduct(product)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Sửa
                          </button>
                        </Link>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(category._id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
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
