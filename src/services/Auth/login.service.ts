import { JwtPayload, LoginInputProps } from "../../types"
import { baseApi } from '../baseApi'

interface LoginResponse {
  token: string
  user: JwtPayload
}

interface GetUserResponse {
  user: JwtPayload
}

// Login
export const loginUser = async (data: LoginInputProps): Promise<LoginResponse> => {
  const res = await baseApi.post<LoginResponse, LoginInputProps>('/auth/login', data)
  return res.data
}

// Get user by ID
export const getUserById = async (id: string, token: string): Promise<JwtPayload> => {
  const res = await baseApi.get<GetUserResponse>(`/users/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return res.data.user
}

