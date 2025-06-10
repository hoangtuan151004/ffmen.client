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
    .required("Vui lòng nhập giá sản phẩm")
    .positive("Hãy nhập số dương"),
  price2: Yup.number().notRequired(),
  quantity: Yup.number()
    .required("Vui lòng nhập số lượng")
    .min(1, "Tối thiểu 1"),
  shortDescription: Yup.string().required("Vui lòng nhập mô tả ngắn"),
  longDescription: Yup.string().required("Vui lòng nhập mô tả dài"),
  categoryId: Yup.string().required("Vui lòng chọn danh mục"),
  categoryName: Yup.string().required(),
  imgs: Yup.array().min(1, "Hãy chọn ít nhất 1 hình ảnh"),
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
    data.append("price2", values.price2); // Đúng tên theo backend
    data.append("quantity", values.quantity);
    data.append("shortDescription", values.shortDescription);
    data.append("longDescription", values.longDescription);
    data.append("categoryId", values.categoryId); // category là ID
    data.append("categoryName", values.categoryName); // thêm categoryName

    // Nếu có nhiều ảnh
    if (values.imgs && values.imgs.length > 0) {
      for (let i = 0; i < values.imgs.length; i++) {
        data.append("imgs", values.imgs[i]);
      }
    }

    try {
      const res = await fetch("http://localhost:3000/products/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      });
      const result = await res.json();
      if (result.error) {
        setError(result.error);
      } else {
        setMessage(result.message);
        setShowPopup(false);
        setIsSuccessPopupVisible(true);
        fetchProducts();
        setPreviewimg(null);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
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

      <main className=" bg-gray-100">
        <div className="records bg-white rounded-xl p-4 shadow-md">
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
                      price2: "",
                      quantity: "",
                      shortDescription: "",
                      longDescription: "",
                      categoryId: "",
                      categoryName: "",
                      imgs: [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitpro}
                  >
                    {({ setFieldValue, isSubmitting }) => (
                      <Form id="formThemSanPham" encType="multipart/form-data">
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
                        {/* Giá khuyến mãi */}
                        <div className="mb-4">
                          <label
                            htmlFor="price2"
                            className="block text-black mb-1"
                          >
                            Giá khuyến mãi
                          </label>
                          <Field
                            name="price2"
                            type="number"
                            className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập giá khuyến mãi (nếu có)"
                          />
                          <ErrorMessage
                            name="price2"
                            component="small"
                            className="text-red-500"
                          />
                        </div>

                        {/* Số lượng */}
                        <div className="mb-4">
                          <label
                            htmlFor="quantity"
                            className="block text-black mb-1"
                          >
                            Số lượng
                          </label>
                          <Field
                            name="quantity"
                            type="number"
                            className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập số lượng"
                          />
                          <ErrorMessage
                            name="quantity"
                            component="small"
                            className="text-red-500"
                          />
                        </div>
                        {/* Hình ảnh */}
                        <input
                          name="imgs"
                          type="file"
                          multiple
                          onChange={(event) => {
                            const files = Array.from(event.currentTarget.files);
                            setFieldValue("imgs", files);
                            // Gợi ý: Preview cái đầu tiên
                            if (files[0]) {
                              const preview = URL.createObjectURL(files[0]);
                              setPreviewimg(preview);
                            }
                          }}
                        />

                        {/* Danh mục */}
                        <div className="mb-4">
                          <label
                            htmlFor="categoryId"
                            className="block text-black mb-1"
                          >
                            Danh mục
                          </label>
                          <Field
                            as="select"
                            name="categoryId"
                            className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => {
                              const selectedCat = categories.find(
                                (c) => c._id === e.target.value
                              );
                              setFieldValue("categoryId", selectedCat?._id);
                              setFieldValue("categoryName", selectedCat?.name);
                            }}
                          >
                            <option value="">Chọn danh mục</option>
                            {categories.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="categoryId"
                            component="small"
                            className="text-red-500"
                          />
                        </div>

                        {/* Mô tả ngắn */}
                        <div className="mb-4">
                          <label
                            htmlFor="shortDescription"
                            className="block text-black mb-1"
                          >
                            Mô tả ngắn
                          </label>
                          <Field
                            as="textarea"
                            name="shortDescription"
                            className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Mô tả ngắn sản phẩm"
                          />
                          <ErrorMessage
                            name="shortDescription"
                            component="small"
                            className="text-red-500"
                          />
                        </div>

                        {/* Mô tả dài */}
                        <div className="mb-4">
                          <label
                            htmlFor="longDescription"
                            className="block text-black mb-1"
                          >
                            Mô tả dài
                          </label>
                          <Field
                            as="textarea"
                            name="longDescription"
                            className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Mô tả chi tiết sản phẩm"
                          />
                          <ErrorMessage
                            name="longDescription"
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
          <div className="table-responsive overflow-auto rounded-md">
            <table className="w-full text-left table-fixed  border-collapse border border-gray-200">
              <thead className="bg-gray-200  ">
                <tr>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700 ">
                    STT
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Tên
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Số lượng
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Giá
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Giá giảm
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Danh mục
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Hình ảnh
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Mô tả
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product: any, index: number) => (
                  <tr
                    key={product.id}
                    className="even:bg-gray-50 hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-3 px-4 border border-gray-300 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                      {product.name}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                      {product.quantity}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                      {formatCurrency(product.price2)}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                      {product.category.categoryName}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                      <img
                        src={product.imgs[0]?.url}
                        alt={product.name}
                        className="w-16 h-16"
                      />
                    </td>

                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
                      {product.shortDescription.length > 100
                        ? product.shortDescription.substring(0, 100) + "..."
                        : product.shortDescription}
                    </td>
                    <td className="py-3 px-4 border border-gray-300 text-sm font-medium text-gray-700">
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
                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-3 px-4 border border-gray-300 text-center text-sm text-gray-500"
                    >
                      Không có sản phẩm nào
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

export default ProductAdmin;
