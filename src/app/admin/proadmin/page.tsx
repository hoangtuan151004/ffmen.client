"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getAllProducts, deleteProduct } from "@/api/products";
import { Category, Product, Data } from "@/types/index";
import { fetchCategories } from "../../../api/categories";
import ProductPopup from "../components/ProductPopupForm/PopupPro";
import toast from "react-hot-toast";
import axios from "axios";
import ProductTable from "../components/ProductTable";
import ReactPaginate from "react-paginate";

const ProductAdmin: React.FC = () => {
  const defaultValues = {
    name: "",
    price: 0,
    price2: 0,
    quantity: 0,
    shortDescription: "",
    longDescription: "",
    categoryId: "",
    categoryName: "",
    imgs: [],
    variants: [],
  };
  const [popupState, setPopupState] = useState({
    show: false,
    isEdit: false,
    initData: defaultValues,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [previewimg, setPreviewimg] = useState<string[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // Gọi useRouter trực tiếp
  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }

  // Lấy danh sách sản phẩm từ API
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0); // ReactPaginate xài index bắt đầu từ 0
  const [pageCount, setPageCount] = useState(0);

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = async (page = 1) => {
    try {
      const response = await getAllProducts(page, 10);
      setProducts(response.data || []);
      setPageCount(response.totalPages); // hoặc tính từ totalItems / 10
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm", error);
    }
  };
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);
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
    fetchProducts(1);
    fetchCategories();
    setIsClient(true);
    accessTokenFuc();
  }, []);
  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    fetchProducts(selectedPage + 1); // vì currentPage là 0-indexed
  };

  const accessTokenFuc = () => {
    if (localStorage.getItem("token") === null) {
      setAccessToken(sessionStorage.getItem("token"));
      return;
    }
    setAccessToken(localStorage.getItem("token"));
  };

  const handleSubmitpro = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      // Append dữ liệu cơ bản
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("price2", values.price2);
      formData.append("quantity", values.quantity);
      formData.append("categoryId", values.categoryId);
      formData.append("categoryName", values.categoryName);
      formData.append("shortDescription", values.shortDescription);
      formData.append("longDescription", values.longDescription);

      // Append ảnh sản phẩm
      for (let img of values.imgs) {
        if (img instanceof File) {
          formData.append("imgs", img); // ✅ file mới
        }
      }

      // ✅ Convert variants sang JSON string để backend parse được
      const cleanVariants = values.variants.map((v) => ({
        price: v.price,
        quantity: v.quantity,
        sku: v.sku,
        attributes: {
          size: v.attributes?.size || "",
          color: v.attributes?.color || "",
        },
        // 🟡 Nếu cần upload ảnh biến thể => có thể xử lý riêng phía backend
        img: v.img || "",
      }));
      formData.append("variants", JSON.stringify(cleanVariants));

      // ✅ Gửi API
      const res = await axios.post(
        "http://localhost:3000/products/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success("Thêm sản phẩm thành công!");

      // ✅ Gọi lại danh sách (nếu cần)
      fetchProducts?.();
      setPopupState((prev) => ({ ...prev, show: false }));

      resetForm();
    } catch (err) {
      console.error("Lỗi khi gửi dữ liệu:", err);
      toast.error("Lỗi khi tải lên file");
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
      fetchProducts(currentPage);
    }
  };

  if (!isClient) return null;

  return (
    <>
      <main className=" bg-gray-100">
        <div className="records bg-white rounded-xl p-4 shadow-md">
          <div className="record-header flex justify-between items-center mb-4">
            <button
              onClick={() =>
                setPopupState({
                  show: true,
                  isEdit: false,
                  initData: defaultValues,
                })
              }
              className="bg-blue-400 text-white rounded px-3 py-1 hover:bg-blue-500 "
            >
              Thêm sản phẩm
            </button>
            <ProductPopup
              showPopup={popupState.show}
              setShowPopup={(val) =>
                setPopupState({ ...popupState, show: val })
              }
              categories={categories}
              handleSubmitpro={handleSubmitpro}
              isEditMode={popupState.isEdit}
              initialValues={popupState.initData}
            />
          </div>

          {/* Display products */}

          <ProductTable
            products={products}
            onDelete={handleDeleteProduct}
            formatCurrency={formatCurrency}
          />

          <ReactPaginate
            previousLabel={"Trước"}
            nextLabel={"Sau"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-8 space-x-2 text-black"
            pageClassName="px-3 py-2 text-black bg-white border rounded-lg"
            previousLinkClassName="px-4 text-black py-2 bg-white text-black border rounded-lg"
            nextLinkClassName="px-4 py-2 text-black bg-white border rounded-lg"
            disabledClassName="opacity-50 cursor-not-allowed pointer-events-none text-black"
            activeClassName="px-3 py-2 text-gray-400 bg-indigo-600 rounded-lg"
            forcePage={currentPage}
          />
        </div>
      </main>
    </>
  );
};

export default ProductAdmin;
