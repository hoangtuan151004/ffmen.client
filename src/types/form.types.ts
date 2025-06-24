import { LoginRequest } from "./auth.types";

export interface LoginForm extends LoginRequest {
  remember: boolean;
}

export interface FormData {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  img?: FileList;
}
