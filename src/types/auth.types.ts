export type RegisterInputProps = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInputProps = {
  email: string;
  password: string;
};

export type UserProps = {
  avatar: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  isActive: boolean;
  isActiveEmail: boolean;
  isActivePhone: boolean;
};
