import axios from "axios";
import { apiUrl } from "@/utils/constants";

const axiosClient = axios.create({
  baseURL: apiUrl,
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res = await axios.post(`${apiUrl}auth/refresh`, {
          refreshToken,
        });

        localStorage.setItem("token", res.data.accessToken);

        originalReq.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axiosClient(originalReq);
      } catch (err) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
