import { baseApi } from '../baseApi'

// Kiểu đầy đủ dùng trong form
export interface RegisterInputProps {
  fullName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string // chỉ dùng để xác nhận mật khẩu, không gửi lên server
}

// Payload thực tế gửi lên API (không có confirmPassword)
type RegisterPayload = Omit<RegisterInputProps, 'confirmPassword'>

interface RegisterResponse {
  message: string
}

// Gọi API đăng ký người dùng
export const registerUser = async (data: RegisterPayload): Promise<RegisterResponse> => {
  const res = await baseApi.post<RegisterResponse, RegisterPayload>('/auth/register', data)
  return res.data
}
