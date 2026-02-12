import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  // Run this as soon as an axios request succeeds. Return only the data from the response.
  (response) => response.data.data,
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

export default axiosClient;
