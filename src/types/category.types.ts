export interface Category {
  _id: string;
  name: string;
  description: string;
  parentCategory?: string | null;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface CategoryListResponse {
  data: Category[];
  currentPage: number;
  totalPages: number;
  totalCategories: number;
}
export interface CreateOrUpdateCategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}
