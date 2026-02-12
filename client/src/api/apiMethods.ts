import type { AxiosRequestConfig } from "axios";
import axiosClient from "./axiosClient";

const api = {
  get: async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const data = await axiosClient.get<T>(endpoint, config);
    return data as T;
  },

  post: async <T, B = unknown>(
    endpoint: string,
    body: B,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const data = await axiosClient.post<T>(endpoint, body, config);
    return data as T;
  },

  put: async <T, B = unknown>(
    endpoint: string,
    body: B,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const data = await axiosClient.put<T>(endpoint, body, config);
    return data as T;
  },

  patch: async <T, B = unknown>(
    endpoint: string,
    body: B,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const data = await axiosClient.patch<T>(endpoint, body, config);
    return data as T;
  },

  del: async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const data = await axiosClient.delete<T>(endpoint, config);
    return data as T;
  },
};

export default api;
