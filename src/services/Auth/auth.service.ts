// src/services/auth.service.ts
import { baseApi } from "../baseApi";
import { UserProps, LoginInputProps, RegisterInputProps } from "@/types";

// ===========================
// Đăng xuất
// ===========================
export const logoutApi = async () => {
  return baseApi.post("/auth/logout", {});
};

// ===========================
// Đăng nhập
// ===========================
interface LoginResponse {
  token: string;
  user: UserProps;
}

export const loginUser = async (data: LoginInputProps): Promise<LoginResponse> => {
  const res = await baseApi.post<LoginResponse, LoginInputProps>("/auth/login", data);
  return res.data;
};

// ===========================
// Lấy thông tin người dùng theo ID
// ===========================
interface GetUserResponse {
  user: UserProps;
}

export const getUserById = async (id: string, token: string): Promise<UserProps> => {
  const res = await baseApi.get<GetUserResponse>(`/users/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.user;
};

// ===========================
// Đăng ký tài khoản mới
// ===========================

type RegisterPayload = Omit<RegisterInputProps, "confirmPassword">;

interface RegisterResponse {
  message: string;
}

export const registerUser = async (data: RegisterPayload): Promise<RegisterResponse> => {
  const res = await baseApi.post<RegisterResponse, RegisterPayload>("/auth/register", data);
  return res.data;
};

// ===========================
// Quên mật khẩu: Gửi lại OTP
// ===========================
interface ResendOtpPayload {
  email?: string;
  phoneNumber?: string;
}

export const resendOtp = async (payload: ResendOtpPayload) => {
  const res = await baseApi.post<{ message: string }, ResendOtpPayload>(
    "/auth/resend-otp",
    payload
  );
  return res.data;
};

// ===========================
// Quên mật khẩu: Xác minh OTP
// ===========================
interface VerifyOtpPayload extends ResendOtpPayload {
  otp: string;
}

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const res = await baseApi.post<{ message: string }, VerifyOtpPayload>(
    "/auth/verify-password",
    payload
  );
  return res.data;
};

// ===========================
// Quên mật khẩu: Đặt lại mật khẩu mới
// ===========================
interface ResetPasswordPayload extends ResendOtpPayload {
  password: string;
}

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const res = await baseApi.post<{ message: string }, ResetPasswordPayload>(
    "/auth/reset-password",
    payload
  );
  return res.data;
};
