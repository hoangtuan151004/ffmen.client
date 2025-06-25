import { Category } from "./category.types";

export interface IImg {
  _id?: string;
  url: string;
}

export interface IVariant {
  _id?: string; // 👈 Biến thể có thể có _id nếu là biến thể cũ
  attributes: {
    size: string;
    color: string;
  };
  price: number;
  quantity: number;
  sku?: string;
  img?: string;
  /** Ảnh mới nếu user upload lại (chỉ tồn tại ở FE) */
  imgFile?: File | null; // 👈 thêm nếu xử lý ảnh biến thể ở form
  /** Flag nội bộ nếu muốn track variant mới/tạm xoá (tùy UI dùng) */
  isNew?: boolean;
}

export interface IProduct {
  _id: string;
  name: string;
  imgs: IImg[];
  price: number;
  discountPrice: number;
  variants: IVariant[];

  categoryId?: string;
  category: Category;

  hot?: number;
  view?: number;
  shortDescription?: string;
  longDescription?: string;
  createdAt?: string;
  updatedAt?: string;

  /** Tổng số lượng gộp từ tất cả biến thể */
  quantity?: number;

  /** Cờ hiển thị (ẩn/sản phẩm) */
  isVisible?: boolean;
  /** Mã SKU của sản phẩm (chung) */
  sku?: string;
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
