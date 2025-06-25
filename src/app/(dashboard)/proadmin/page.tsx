"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProducts, deleteProduct } from "@/services/product.service";
import { Category } from "@/types/index";
import ProductPopup from "../../../components/FormInput/ProductPopupForm/PopupPro";
import toast from "react-hot-toast";
import ProductTable from "../../../components/FormInput/ProductTable";
import ReactPaginate from "react-paginate";
import { getAllCategories } from "@/services/category.service";

const ProductAdmin: React.FC = () => {
  const defaultValues = {
    name: "",
    price: 0,
    discountPrice: 0,
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

  const handleSubmitpro = async (
    values,
    { setSubmitting, resetForm },
    isEditMode
  ) => {
    const isEdit = isEditMode && values._id;
    const formData = new FormData();

    // 1. Thông tin cơ bản
    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("discountPrice", values.discountPrice?.toString() || "0");
    formData.append("quantity", values.quantity.toString());
    formData.append(
      "category",
      JSON.stringify({ categoryId: values.categoryId })
    );
    formData.append("categoryName", values.categoryName || "");
    formData.append("shortDescription", values.shortDescription);
    formData.append("longDescription", values.longDescription);

    // 2. Xử lý ảnh sản phẩm
    const urlImages: string[] = [];
    for (let img of values.imgs) {
      if (img instanceof File) {
        formData.append("files", img);
      } else if (typeof img === "string") {
        urlImages.push(img);
      }
    }
    if (urlImages.length) {
      formData.append("imgUrls", JSON.stringify(urlImages));
    }

    // 3. Biến thể
    const cleanVariants = values.variants.map((v: any) => ({
      _id: v._id, // 👈 QUAN TRỌNG để biết là biến thể cũ cần cập nhật
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

    // 4. Danh sách biến thể bị xoá
    if (values.deletedVariantIds?.length) {
      formData.append(
        "deletedVariantIds",
        JSON.stringify(values.deletedVariantIds)
      );
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products${isEdit ? `/${values._id}` : ""
        }`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!res.ok)
        throw new Error(
          isEdit ? "Cập nhật thất bại" : "Thêm sản phẩm thất bại"
        );

      toast.success(
        isEdit ? "Cập nhật thành công!" : "Thêm sản phẩm thành công!"
      );
      fetchProducts?.();
      setPopupState((prev) => ({ ...prev, show: false }));
      resetForm();
    } catch (err) {
      toast.error("Lỗi khi gửi dữ liệu sản phẩm");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProduct = async (productId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!res.ok) throw new Error("Không lấy được sản phẩm");

      const data = await res.json();

      const product = data?.data || data; // tùy backend response

      // Normalize dữ liệu cho form
      const initData = {
        name: product.name || "",
        price: product.price || 0,
        discountPrice: product.discountPrice || 0,
        quantity: product.quantity || 0,
        shortDescription: product.shortDescription || "",
        longDescription: product.longDescription || "",
        categoryId: product.category?._id || product.categoryId || "",
        categoryName: product.category?.name || product.categoryName || "",
        imgs: product.imgs.map((imgObj: any) => imgObj.url),
        variants:
          product.variants?.map((v: any) => ({
            _id: v._id, // 👈 thêm dòng này rất quan trọng
            attributes: {
              size: v.attributes?.size || "",
              color: v.attributes?.color || "",
            },
            price: v.price || 0,
            quantity: v.quantity || 0,
            sku: v.sku || "",
            img: v.img || "",
            imgFile: null,
          })) || [],
        _id: product._id, // cần để PUT
      };

      setPopupState({
        show: true,
        isEdit: true,
        initData,
      });
    } catch (err) {
      toast.error("Không thể lấy thông tin sản phẩm.");
      console.error("Fetch product error:", err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded shadow-md border flex flex-col space-y-2 max-w-xs">
        <p className="text-gray-800 font-medium">
          Bạn có chắc chắn muốn xoá sản phẩm này không?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            className="text-sm px-3 py-1 rounded text-gray-800 bg-gray-200 hover:bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Huỷ
          </button>
          <button
            className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={async () => {
              toast.dismiss(t.id);
              const result = await deleteProduct(id);
              if (result) {
                setProducts((prev) => prev.filter((p) => p._id !== id));
                toast.success("🗑️ Đã xoá sản phẩm!");
                fetchProducts(currentPage + 1);
              } else {
                toast.error("❌ Lỗi khi xoá sản phẩm!");
              }
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    ));
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
          onEdit={(productId) => handleEditProduct(productId)}
          onDelete={handleDeleteProduct}
          formatCurrency={formatCurrency}
        />

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

export default ProductAdmin;
