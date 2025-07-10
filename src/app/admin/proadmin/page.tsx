"use client";
import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  deleteProduct,
  createOrUpdateProduct,
  getProductById,
} from "@/services/product.service";
import { Category, ProductFormData } from "@/types/index";
import toast from "react-hot-toast";
import ProductTable from "../../../components/Admin/ProductTable";
import ReactPaginate from "react-paginate";
import { getAllCategories } from "@/services/category.service";
import ProductPopup from "../../../components/Admin/ProductPopupForm/PopupPro";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { cookies } from "next/headers";
const ProductAdmin: React.FC = () => {
  const defaultValues: ProductFormData = {
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
  const accessToken = cookies().get("token")?.value
  const [categories, setCategories] = useState<Category[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth(); // 👈 lấy token và user từ context
  console.log(user?.roles);
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
    const init = async () => {
      try {
        await fetchProducts(currentPage + 1);

        const result = await getAllCategories();
        setCategories(Array.isArray(result.data) ? result.data : []);

        setIsClient(true);
      } catch (err) {
        console.error("Lỗi khi khởi tạo ProductAdmin", err);
      }
    };
    init();
  }, [currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    fetchProducts(selectedPage + 1);
  };
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const handleSubmitpro = async (
    values: any,

    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (v: boolean) => void; resetForm: () => void },
    isEditMode: boolean
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

    // 3. Biến thể & ảnh biến thể
    const cleanVariants: any = [];
    const variantImgIndexes: number[] = [];

    values.variants.forEach((v: any, i: number) => {
      const isFile = v.imgFile instanceof File;

      if (isFile) {
        formData.append("variantFiles", v.imgFile);
        variantImgIndexes.push(i);
      }

      cleanVariants.push({
        _id: v._id,
        price: v.price,
        quantity: v.quantity,
        sku: v.sku,
        attributes: {
          size: v.attributes?.size || "",
          color: v.attributes?.color || "",
        },
        img: isFile ? "" : v.img,
      });
    });

    formData.append("variants", JSON.stringify(cleanVariants));
    formData.append("variantImgIndexes", JSON.stringify(variantImgIndexes));

    // 4. Biến thể bị xoá
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
        isEditMode ? "Cập nhật thành công!" : "Thêm sản phẩm thành công!"
      );
      fetchProducts();
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
      const product = await getProductById(productId, accessToken ?? undefined);

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
            _id: v._id,
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
        _id: product._id,
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

  const handleDeleteProduct = (id: string) => {
    toast(
      (t) => (
        <div className="bg-white p-4 rounded shadow-md border flex flex-col space-y-2 max-w-xs">
          <p className="text-gray-800 font-medium">
            Bạn có chắc chắn muốn xoá sản phẩm này không?
          </p>
          <div className="flex justify-end space-x-3 mt-2">
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
                try {
                  const result = await deleteProduct(id, accessToken ?? undefined);
                  if (result) {
                    setProducts((prev: any) =>
                      prev.filter((p: any) => p._id !== id)
                    );
                    toast.success("🗑️ Xoá sản phẩm thành công!", {
                      style: {
                        border: "1px solid #4ade80",
                        padding: "12px",
                        color: "#166534",
                      },
                      iconTheme: {
                        primary: "#4ade80",
                        secondary: "#f0fdf4",
                      },
                    });
                    fetchProducts(currentPage);
                  } else {
                    toast.error("❌ Xoá sản phẩm không thành công!");
                  }
                } catch (err) {
                  console.error(err);
                  toast.error("❌ Đã xảy ra lỗi khi xoá!");
                }
              }}
            >
              Xác nhận
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-center",

        style: {
          background: "transparent",
          boxShadow: "none",
        },
      }
    );
  };

  if (!isClient) return null;

  return (
    <main className=" space-y-2 p-2 w-full">
      <div className="records bg-white rounded-xl p-4 shadow-md ">
        <div className="record-header flex justify-between items-center mb-4">
          <Link href="">
            <h1 className="text-xl text-black">Quản Lý sản phẩm</h1>
          </Link>
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
