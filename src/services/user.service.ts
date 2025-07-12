import { UserProps } from "../types/auth.types";
import { baseApi } from "./baseApi";

// ===========================
// Lấy tất cả thông tin người dùng
// ===========================

export const getAllUsers = async (token: string): Promise<UserProps[]> => {
  const res = await baseApi.get<{ users: UserProps[] }>("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.users;
};

// ===========================
// Lấy thông tin người dùng theo ID
// ===========================
interface GetUserResponse {
  user: UserProps;
}

export const getUserById = async (
  id: string,
  token: string
): Promise<UserProps> => {
  const res = await baseApi.get<GetUserResponse>(`/users/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.user;
};

// ==========================
// Edit password user
// ==========================
export const changeUserPassword = async (
  id: string,
  token: string,
  newPassword: string
) => {
  await baseApi.post(
    `/users/user/${id}`,
    { password: newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
