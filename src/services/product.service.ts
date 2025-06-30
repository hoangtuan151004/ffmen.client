import { ProductListResponse, IProduct, DeleteProductResponse } from "@/types";
import { baseApi } from "./baseApi";

// GET: Danh sách sản phẩm có phân trang
export const getAllProducts = async (
  page = 1,
  limit = 10
): Promise<ProductListResponse> => {
  const res = await baseApi.get<ProductListResponse>("/products", {
    params: { page, limit },
  });
  return res.data;
};

export const getProductById = async (
  id: string,
  token?: string
): Promise<IProduct> => {
  const res = await baseApi.get<{ data: IProduct }>(`/products/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data.data || res.data;
};

export const createOrUpdateProduct = async (
  values: any,
  isEditMode: boolean,
  token?: string
): Promise<IProduct> => {
  const isEdit = isEditMode && values._id;
  const formData = new FormData();
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
  const cleanVariants: any[] = [];
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
  if (values.deletedVariantIds?.length) {
    formData.append(
      "deletedVariantIds",
      JSON.stringify(values.deletedVariantIds)
    );
  }
  const res = await baseApi.request<{ data: IProduct }>({
    url: `/products${isEdit ? `/${values._id}` : ""}`,
    method: isEdit ? "PUT" : "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return res.data.data || res.data;
};

export const deleteProduct = async (
  id: string,
  token?: string
): Promise<DeleteProductResponse> => {
  try {
    const res = await baseApi.delete<DeleteProductResponse>(`/products/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.data.success) {
      throw new Error(res.data.message || "Xóa sản phẩm thất bại");
    }

    return res.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};
