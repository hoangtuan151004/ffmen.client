export interface Category {
  _id: string;
  name: string;
  description: string;
}
export interface Data {
  _id: string;
  name: string;
  imgs: {
    _id: string; // từ ObjectId trong MongoDB
    url: string;
  }[];
  price: number;
  price2: number;
  quantity: number;
  variants: {
    attributes: {
      size: string;
      color: string;
    };
    price: number;
    quantity: number;
    sku?: string;
    img?: string;
  }[];
  category: {
    categoryId: string;
    categoryName: string;
  };
  hot?: number;
  view?: number;
  shortDescription?: string;
  longDescription?: string;
}

export type Product = {
  data: Data[];
  currentPage?: number;
  totalPages?: number;
  totalProducts?: number;
};

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  confirm_password: string;
  email: string;
  full_name: string;
}

export interface LoginForm extends LoginRequest {
  remember: boolean;
}

export interface AuthData {
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  accessToken: string;
}

export interface AuthResponse {
  status: number;
  data: {
    accessToken: string;
    roles: ["user", "admin"]; // Role có thể là 'customer' hoặc 'admin'
  };
  message: string;
}

export interface EditProductProps {
  params: { id: string };
}

export interface FormData {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  img?: FileList;
}
export interface Cart {
  items: {
    productId: Data;
    quantity: number;
  }[];
  totalPrice: number;
  totalItems: number;
}
// Kiểu dữ liệu cho sản phẩm trong giỏ hàng
export interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
}

// Kiểu dữ liệu phản hồi của giỏ hàng
export interface CartResponse {
  _id: string;
  name: string;
  price: number;
  price_2: number;
  quantity: number;
  img: string;
}
