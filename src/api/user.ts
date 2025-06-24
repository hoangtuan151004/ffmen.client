import { baseApi } from "@/services/baseApi";
import { AuthResponse, LoginRequest } from "@/types";
import { RegisterRequest } from "@/types";
import axios from "axios";
// Hàm gọi API đăng nhập
export const loginUser = async (
  data: LoginRequest
): Promise<AuthResponse | null> => {
  try {
    const response = await baseApi.post<AuthResponse, LoginRequest>(
      "/api/auth/login",
      data
    );

    if (response.status !== 200) {
      console.error("Lỗi khi đăng nhập:", response.data.message);
      return null;
    }

    return response.data; // Trả về accessToken và role
  } catch (error) {
    console.error("Lỗi khi gọi API đăng nhập", error);
    return null;
  }
};
export const registerUser = async (
  data: RegisterRequest
): Promise<AuthResponse | null> => {
  try {
    const response = await baseApi.post<AuthResponse, RegisterRequest>(
      "/api/auth/register",
      data
    );

    // Kiểm tra nếu status không phải 201
    if (response.status !== 201) {
      console.error("Lỗi khi đăng ký:", response.data.message);
      return null;
    }

    return response.data; // Trả về accessToken và role (nếu cần)
  } catch (error) {
    console.error("Lỗi khi gọi API đăng ký", error);
    return null;
  }
};
export const fetchTotalUsers = async (accessToken: string) => {
  try {
    const { data } = await axios.get("/api/auth/total-users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.totalUsers;
  } catch (error) {
    console.error("Failed to fetch total users:", error);
    console.error("Backend error:", error);
    throw error;
  }
};
export const fetchUsers = async () => {
  try {
    const response = await fetch("/api/auth/all-users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};
