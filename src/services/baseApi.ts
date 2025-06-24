// src/services/baseApi.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") || sessionStorage.getItem("token")
        : null;

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    return Promise.reject(error);
  }
);

// Base API Wrapper
class BaseApi {
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.get<T>(url, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async post<T, R>(
    url: string,
    data: R,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.post<T>(url, data, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.put<T>(url, data, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.delete<T>(url, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error.response) {
      console.error("🚨 API Response Error:", error.response);
      throw new Error(error.response.data?.message || "API Error");
    } else if (error.request) {
      console.error("🚨 No Response from API:", error.request);
      throw new Error("No response from server.");
    } else {
      console.error("🚨 Request Setup Error:", error.message);
      throw new Error(error.message);
    }
  }
}

export const baseApi = new BaseApi();
