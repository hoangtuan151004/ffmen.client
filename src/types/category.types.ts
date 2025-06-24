export interface Category {
  _id: string;
  name: string;
  description: string;
  parentCategory?: string | null;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}
