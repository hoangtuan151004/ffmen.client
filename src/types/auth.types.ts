export type RegisterInputProps = {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInputProps = {
  email: string;
  password: string;
};

export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
  STAFF = "staff",
}

export type UserProps = {
  id: string;
  avatar: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  roles: UserRole[];
  isActive: boolean;
  isActiveEmail: boolean;
  isActivePhone: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export interface JwtPayload {
  id: string;
  role: string;
  roles?: string[];
  fullName: string;
  isActive: boolean;
  avatar?: string;
  // exp: number;
  // iat: number;
}

export interface AuthContextType {
  token: string | null;
  user: JwtPayload | null;
}
