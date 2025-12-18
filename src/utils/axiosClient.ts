import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { apiUrl } from "@/utils/constants";

/* ------------------------------------------------------------------ */
/* 1️⃣ Create Axios instance                                           */
/* ------------------------------------------------------------------ */
const axiosClient = axios.create({
  baseURL: apiUrl,
});

/* ------------------------------------------------------------------ */
/* 2️⃣ Request interceptor – attach access token                       */
/* ------------------------------------------------------------------ */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ------------------------------------------------------------------ */
/* 3️⃣ Safe logout (ONLY for confirmed auth failure)                   */
/* ------------------------------------------------------------------ */
export const safeLogout = async () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");

  window.location.href = "/auth?mode=login";
};

/* ------------------------------------------------------------------ */
/* 4️⃣ Prevent multiple interceptor registrations                      */
/* ------------------------------------------------------------------ */
let responseInterceptorAttached = false;

/* ------------------------------------------------------------------ */
/* 5️⃣ Response interceptor with refresh logic                         */
/* ------------------------------------------------------------------ */
export const attachResponseInterceptor = (
  onTokenRefresh?: (newToken: string) => void
) => {
  if (responseInterceptorAttached) return;
  responseInterceptorAttached = true;

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest: any = error.config;

      // ❌ No config or not a 401 → reject
      if (!originalRequest || error.response?.status !== 401) {
        return Promise.reject(error);
      }

      // ❌ Already retried → reject
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (typeof window === "undefined") {
        return Promise.reject(error);
      }

      const refreshToken = localStorage.getItem("refreshToken");

      // ❌ No refresh token → real logout
      if (!refreshToken) {
        await safeLogout();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${apiUrl}auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data?.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token returned");
        }

        // ✅ Persist new token
        localStorage.setItem("token", newAccessToken);

        // ✅ Update Redux if provided
        onTokenRefresh?.(newAccessToken);

        // ✅ Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError: any) {
        // 🚨 Logout ONLY if refresh token is actually invalid
        if (refreshError.response?.status === 401) {
          await safeLogout();
        }

        return Promise.reject(refreshError);
      }
    }
  );
};

export default axiosClient;
