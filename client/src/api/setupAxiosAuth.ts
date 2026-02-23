import type { GetToken } from "@clerk/types";
import axiosClient from "./axiosClient";
import axios from "axios";

let requestInterceptorId: number | undefined = undefined;
let responseInterceptorId: number | undefined = undefined;

export const setupAxiosAuth = (getToken: GetToken) => {
  if (requestInterceptorId !== undefined) {
    axiosClient.interceptors.request.eject(requestInterceptorId);
  }
  if (responseInterceptorId !== undefined) {
    axiosClient.interceptors.response.eject(responseInterceptorId);
  }

  requestInterceptorId = axiosClient.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("Attached the bearer token to header inside axios");
        }

        return config;
      } catch (error) {
        console.log("faild to attach the bearer token to axios header");
        return config;
      }
    },
    (error) => Promise.reject(error),
  );

  responseInterceptorId = axiosClient.interceptors.response.use(
    // Run this as soon as an axios request succeeds. Return only the data from the response.
    (response) => response.data,
    // Run this as soon as the request fails to format the error we eventually throw.
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ?? error.message ?? "Unexpcted error";

        return Promise.reject(new Error(errorMessage));
      }

      if (error instanceof Error) {
        return Promise.reject(error);
      }

      return Promise.reject(new Error("Unexpected Error"));
    },
  );
};
