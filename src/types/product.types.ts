import { Category } from "./category.types";

export interface IImg {
  _id?: string;
  url: string;
}

export interface IVariant {
  attributes: {
    size: string;
    color: string;
  };
  price: number;
  quantity: number;
  sku?: string;
  img?: string;
  _id?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  imgs: IImg[];
  price: number;
  discountPrice: number;
  variants: IVariant[];
  category: Category; // Import từ category.types.ts
  hot?: number;
  view?: number;
  shortDescription?: string;
  longDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductListResponse {
  data: IProduct[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
}

export interface EditProductProps {
  params: { id: string };
}
