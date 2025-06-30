import { UserProps } from "../types/auth.types";
import { baseApi } from "./baseApi";

export const getAllUsers = async (token: string): Promise<UserProps[]> => {
  const res = await baseApi.get<{ users: UserProps[] }>("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.users;
};
