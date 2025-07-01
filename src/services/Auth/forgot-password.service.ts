// services/forgot-password.service.ts
import { baseApi } from "../baseApi";

interface ResendOtpPayload {
  email?: string;
  phoneNumber?: string;
}

interface VerifyOtpPayload extends ResendOtpPayload {
  otp: string;
}

interface ResetPasswordPayload extends ResendOtpPayload {
  password: string;
}

// Gửi lại mã OTP
export const resendOtp = async (payload: ResendOtpPayload) => {
  const res = await baseApi.post<{ message: string }, ResendOtpPayload>(
    "/auth/resend-otp",
    payload
  );
  return res.data;
};

// Xác minh mã OTP
export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const res = await baseApi.post<{ message: string }, VerifyOtpPayload>(
    "/auth/verify-password",
    payload
  );
  return res.data;
};

// Đặt lại mật khẩu mới
export const resetPassword = async (payload: ResetPasswordPayload) => {
  const res = await baseApi.post<{ message: string }, ResetPasswordPayload>(
    "/auth/reset-password",
    payload
  );
  return res.data;
};
