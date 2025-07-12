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
  _id: string;
  avatar: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  roles: UserRole[];
  isActive: boolean;
  isActiveEmail: boolean;
  isActivePhone: boolean;
};

export interface JwtPayload {
  roles?: string[];
  isActive: boolean;
  user: UserProps;
}

export interface AuthContextType {
  user: UserProps | null;
}

export interface AuthClientType {
  user: UserProps | null;
  login: (userData: UserProps) => void;
  logout: () => void;
  updateUser: (updatedFields: Partial<UserProps>) => void;
}

export type ChangePasswordProps = {
  _id?:string
  password: string;
  newPassword: string;
  confirmPassword: string;
};
