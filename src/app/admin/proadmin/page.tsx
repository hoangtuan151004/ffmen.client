"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProducts, deleteProduct } from "@/services/product.service";
import { Category } from "@/types/index";
import ProductPopup from "../components/ProductPopupForm/PopupPro";
import toast from "react-hot-toast";
import ProductTable from "../components/ProductTable";
import ReactPaginate from "react-paginate";
import { getAllCategories } from "@/services/category.service";

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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchProducts = async (page = 1) => {
    try {
      const res = await getAllProducts(page, 10);
      setProducts(res.data);
      setPageCount(res.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage + 1);
  }, [currentPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllCategories();
      if (Array.isArray(result)) {
        setCategories(result);
      } else {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(1);
    setIsClient(true);
    accessTokenFuc();
  }, []);

  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    fetchProducts(selectedPage + 1);
  };

  const accessTokenFuc = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setAccessToken(token);
  };

  const handleSubmitpro = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      // Thông tin cơ bản
      formData.append("name", values.name);
      formData.append("price", values.price.toString());
      formData.append("discountPrice", values.discountPrice?.toString() || "0");
      formData.append("quantity", values.quantity.toString());
      formData.append(
        "category",
        JSON.stringify({ categoryId: values.categoryId })
      );

      formData.append("categoryName", values.categoryName);
      formData.append("shortDescription", values.shortDescription);
      formData.append("longDescription", values.longDescription);

      // Xử lý ảnh
      const urlImages: string[] = [];

      for (let img of values.imgs) {
        if (img instanceof File) {
          formData.append("files", img); // 👈 phải là "files" theo multer
        } else if (typeof img === "string") {
          urlImages.push(img);
        }
      }

      if (urlImages.length) {
        formData.append("imgUrls", JSON.stringify(urlImages)); // 👈 backend parse cái này
      }

      // Biến thể
      const cleanVariants = values.variants.map((v) => ({
        price: v.price,
        quantity: v.quantity,
        sku: v.sku,
        attributes: {
          size: v.attributes?.size || "",
          color: v.attributes?.color || "",
        },
        img: v.img || "",
      }));

      formData.append("variants", JSON.stringify(cleanVariants));

      // Gửi request
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // ❌ KHÔNG thêm Content-Type nếu dùng FormData
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Thêm sản phẩm thất bại");

      toast.success("Thêm sản phẩm thành công!");
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

  useEffect(() => {
    console.log("Categories fetched:", categories);
  }, [categories]);

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
      fetchProducts(currentPage + 1);
    }
  };

  if (!isClient) return null;

  return (
    <main className="bg-gray-100">
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
            className="bg-blue-400 text-white rounded px-3 py-1 hover:bg-blue-500"
          >
            Thêm sản phẩm
          </button>
          {popupState.show && categories.length > 0 && (
            <ProductPopup
              showPopup={popupState.show}
              setShowPopup={(val) =>
                setPopupState((prev) => ({ ...prev, show: val }))
              }
              categories={categories}
              handleSubmitpro={handleSubmitpro}
              isEditMode={popupState.isEdit}
              initialValues={popupState.initData}
            />
          )}
        </div>

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
  );
};

export default ProductAdmin;
