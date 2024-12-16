"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getAllProducts, handleImgChange, deleteProduct } from "@/api/products"; // Giả sử API đã được cấu hình
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Category, Product, Data } from "@/types/index";
import { fetchCategories } from "../../../api/categories";
import logo from "@/assets/images/logo.jpg";
import { useForm, SubmitHandler } from "react-hook-form";
const validationSchema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
  price: Yup.number()
    .required("Vui lòng nhập giá cũ")
    .positive("Hãy nhập số dương"),
  description: Yup.string().required("Vui lòng nhập mô tả"),
  category: Yup.string().required("Vui lòng chọn danh mục"),
  img: Yup.mixed().required("Hãy chọn hình ảnh"),
});

const ProductAdmin: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [previewimg, setPreviewimg] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false); // State cho popup thành công
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const router = useRouter(); // Gọi useRouter trực tiếp
  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response?.data || []); // Giả sử API trả về danh sách sản phẩm trong `data`
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm", error);
    }
  };

  // Lấy danh sách danh mục từ API

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
    fetchProducts();
    fetchCategories();
    setIsClient(true);
    accessTokenFuc();
  }, []);

  const accessTokenFuc = () => {
    if (localStorage.getItem("token") === null) {
      setAccessToken(sessionStorage.getItem("token"));
      return;
    }
    setAccessToken(localStorage.getItem("token"));
  };
  const handleSubmitpro = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("price", values.price);
    data.append("description", values.description);
    data.append("category", values.category);
    data.append("img", values.img);

    try {
      const res = await fetch("http://localhost:3000/products/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Thêm token vào header nếu cần
        },
        body: data,
      });
      const result = await res.json();
      if (result.error) {
        setError(result.error);
      } else {
        setMessage(result.message);
        setShowPopup(false); // Đóng popup khi thêm sản phẩm thành công
        setIsSuccessPopupVisible(true); // Hiển thị popup thành công
        fetchProducts();
        setPreviewimg(null); // Reset preview ảnh
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setSubmitting(false); // Đảm bảo luôn dừng trạng thái submitting sau khi xử lý
    }
  };

  //xóa sản phẩm
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      const result = await deleteProduct(id);
      if (result) {
        setProducts((prevProducts: any[]) =>
          prevProducts.filter((product: any) => product._id !== id)
        );
        setMessage("Xóa sản phẩm thành công!");
      } else {
        setError("Xóa sản phẩm thất bại, vui lòng thử lại sau.");
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseSuccessPopup = () => {
    setIsSuccessPopupVisible(false); // Đóng popup thành công
  };
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setShowEditPopup(true);
  };

  if (!isClient) return null; // Trả về null khi chưa client-side, tránh render khi SSR

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css"
        />
      </head>

      {/* Popup thông báo thành công */}
      {isSuccessPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-48">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[400px] relative">
            <button
              onClick={handleCloseSuccessPopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <div className="items-center flex flex-col gap-4">
              <h3 className="text-xl text-green-500">
                Đã thêm sản phẩm thành công
              </h3>
              <button
                onClick={handleCloseSuccessPopup}
                className="bg-[#FF5959] text-white rounded px-3 py-1 hover:text-[#b31f2a] hover:scale-125 transition duration-300"
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup sửa sản phẩm */}
      {showEditPopup && currentProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[1000px] relative max-h-[90vh] overflow-y-auto pt-[50px]">
            <button
              onClick={() => setShowEditPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            {/* nội dung */}
          </div>
        </div>
      )}

      <input type="checkbox" id="menu-toggle" className="hidden" />
      <div
        className={`sidebar fixed h-full w-[165px] bg-gray-800 transition-all duration-300 ${
          isMenuOpen ? "left-0" : "left-[-165px]"
        }`}
      >
        <div className="side-menu mt-8 space-y-2">
          <ul className="flex flex-col items-center text-center pt-[50px]">
            <li className="w-full p-3 hover:bg-gray-700">
              <Link
                href="/admin"
                className="flex flex-col items-center text-gray-400 hover:text-white"
              >
                <span className="text-2xl las la-tachometer-alt"></span>{" "}
                {/* Icon Dashboard mới */}
                <small>Dashboard</small>
              </Link>
            </li>

            <li className="w-full p-3 hover:bg-gray-700">
              <Link
                href="/admin/user"
                className="flex flex-col items-center text-gray-400 hover:text-white"
              >
                <span className="text-2xl las la-user-alt"></span>
                <small>User</small>
              </Link>
            </li>

            <li className="w-full p-3 hover:bg-gray-600 items-center">
              <Link
                href="/admin/categories"
                className="flex items-center text-gray-400 hover:text-white"
              >
                <div className="flex flex-col pl-[45px]">
                  <span className="text-2xl las la-tag"></span>
                  <small>Danh mục</small>
                </div>
              </Link>
            </li>

            {/* Đơn hàng */}
            <li className="w-full p-3 hover:bg-gray-700">
              <Link
                href="/admin/orders"
                className="flex flex-col items-center text-gray-400 hover:text-white"
              >
                <span className="text-2xl las la-box"></span>
                <small>Đơn hàng</small>
              </Link>
            </li>

            {/* Sản phẩm */}
            <li className="w-full p-3 hover:bg-gray-700">
              <Link
                href="/admin/proadmin"
                className="flex flex-col items-center text-gray-400 hover:text-white"
              >
                <span className="text-2xl las la-shopping-cart"></span>
                <small>Sản phẩm</small>
              </Link>
            </li>

            <li className="w-full p-3 hover:bg-gray-700">
              <Link
                href="/"
                className="flex flex-col items-center text-gray-400 hover:text-white"
              >
                <span className="text-2xl las la-home"></span> {/* Icon Home */}
                <small>Quay về trang chủ</small>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`main-content transition-all duration-300 ${
          isMenuOpen ? "ml-[165px]" : "ml-0"
        }`}
      >
        <header className="fixed left-0 top-0 right-0 h-[60px] bg-white shadow-md flex justify-between items-center px-4">
          <div className="flex gap-[20px] items-center">
            <label
              htmlFor="menu-toggle"
              className="cursor-pointer text-2xl las la-bars text-black"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            ></label>
          </div>
          <div className="header-menu flex items-center space-x-4 text-black">
            <label className="text-2xl las la-search"></label>

            <div className="user flex items-center space-x-1 cursor-pointer">
              <span className="text-2xl las la-power-off text-red-500"></span>
              <button
                className="btn-logout"
                onClick={() => {
                  document.cookie = "token=; path=/; max-age=0";
                  window.location.href = "/login";
                }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </header>

        <main className="pt-[60px] bg-gray-100">
          <div className="records bg-white p-4 shadow-md">
            <div className="record-header flex justify-between items-center mb-4">
              <button
                onClick={() => setShowPopup(true)}
                className="bg-[#FF5959] text-white rounded px-3 py-1 hover:text-[#b31f2a] hover:scale-125 transition duration-300"
              >
                Thêm sản phẩm
              </button>

              {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-8 w-[1000px] relative max-h-[90vh] overflow-y-auto pt-[50px]">
                    <button
                      onClick={handleClosePopup}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>

                    <Formik
                      initialValues={{
                        name: "",
                        price: "",
                        description: "",
                        category: "",
                        img: null,
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmitpro}
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
                              Tên sản phẩm
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

                          {/* Giá sản phẩm */}
                          <div className="mb-4">
                            <label
                              htmlFor="price"
                              className="block text-black mb-1"
                            >
                              Giá sản phẩm
                            </label>
                            <Field
                              name="price"
                              type="number"
                              className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Nhập giá sản phẩm"
                            />
                            <ErrorMessage
                              name="price"
                              component="small"
                              className="text-red-500"
                            />
                          </div>

                          {/* Hình ảnh */}
                          <div className="mb-4">
                            <label
                              htmlFor="img"
                              className="block text-black mb-1"
                            >
                              Hình ảnh
                            </label>
                            <input
                              name="img"
                              type="file"
                              className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onChange={(event) =>
                                handleImgChange(
                                  event,
                                  setFieldValue,
                                  setPreviewimg
                                )
                              }
                            />
                            <ErrorMessage
                              name="img"
                              component="small"
                              className="text-red-500"
                            />
                            {previewimg && (
                              <img
                                src={previewimg}
                                alt="Preview"
                                style={{ width: "70px" }}
                                className="mt-2"
                              />
                            )}
                          </div>

                          {/* Danh mục */}
                          <div className="mb-4">
                            <label
                              htmlFor="category"
                              className="block text-black mb-1"
                            >
                              Danh mục
                            </label>
                            <Field
                              as="select"
                              name="category"
                              className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Chọn danh mục</option>
                              {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                  {cat.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="category"
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
              <Link href="">
                <h1 className="text-xl text-black">Quản Lý sản Phẩm</h1>
              </Link>

              <div className="browse flex items-center space-x-2">
                <input
                  type="search"
                  placeholder="Search"
                  className="record-search border rounded p-1 text-gray-600"
                />
              </div>
            </div>

            {/* Display products */}
            <div className="table-responsive overflow-auto">
              <table className="w-full text-left table-fixed  border-collapse border border-gray-200">
                <thead className="bg-gray-200 text-gray-600 ">
                  <tr>
                    <th className="py-4 px-6 ">STT</th>
                    <th className="py-4 px-6">Tên</th>
                    <th className="py-4 px-6">Giá</th>
                    <th className="py-4 px-6">Danh mục</th>
                    <th className="py-4 px-6">Hình ảnh</th>
                    <th className="py-4 px-6">Mô tả</th>
                    <th className="py-4 px-6">Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product: any, index: number) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-200 text-black hover:bg-gray-100 transition duration-200"
                    >
                      <td className="py-2 px-6 border border-gray-300 text-sm text-gray-600">
                        {index + 1}
                      </td>
                      <td className="py-2 px-6 truncate border border-gray-300 text-sm text-gray-600">
                        {product.name}
                      </td>
                      <td className="py-2 px-6 border border-gray-300 text-sm text-gray-600">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="py-2 px-6 truncate border border-gray-300 text-sm text-gray-600">
                        {product.category.categoryName}
                      </td>
                      <td className="py-2 px-6 border border-gray-300 text-sm text-gray-600">
                        <img
                          src={`http://localhost:3000/images/${product.img}`}
                          alt={product.name}
                          className="w-[100px] h-[100px]"
                        />
                      </td>

                      <td className="py-2 px-6 text-[16px] border border-gray-300 text-sm text-gray-600">
                        {product.description.length > 100
                          ? product.description.substring(0, 100) + "..."
                          : product.description}
                      </td>
                      <td className="py-2 px-6 border border-gray-300 text-sm">
                        <Link
                          href={{
                            pathname: `/admin/proadmin/update/${product._id}`,
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
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductAdmin;
