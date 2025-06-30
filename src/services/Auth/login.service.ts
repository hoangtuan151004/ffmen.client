import { JwtPayload } from "../../types"
import { baseApi } from '../baseApi'

interface LoginInput {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: JwtPayload
}

interface GetUserResponse {
  user: JwtPayload
}

// Login
export const loginUser = async (data: LoginInput): Promise<LoginResponse> => {
  const res = await baseApi.post<LoginResponse, LoginInput>('/auth/login', data)
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

