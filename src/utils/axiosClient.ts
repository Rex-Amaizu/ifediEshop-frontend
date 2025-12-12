import axios from "axios";
import { apiUrl } from "@/utils/constants";

// ----------------------
// 1️⃣ Create Axios instance
// ----------------------
const axiosClient = axios.create({
  baseURL: apiUrl, // Base URL for all requests
});

// ----------------------
// 2️⃣ Request interceptor
// ----------------------
axiosClient.interceptors.request.use((config) => {
  // Get access token from localStorage
  const accessToken = localStorage.getItem("token");

  // If token exists, attach it to the Authorization header
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Always return the config
  return config;
});

// ----------------------
// 3️⃣ Helper function: safe logout
// ----------------------
const safeLogout = async (userId?: string) => {
  try {
    // Get refresh token from localStorage
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken && userId) {
      // Call backend logout endpoint to delete refresh token
      await axios.post(
        `${apiUrl}auth/logout`,
        { userId }, // send both userId and refreshToken
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // attach current access token
          },
        }
      );
    }
  } catch (err) {
    console.error("Failed to logout on backend", err);
  } finally {
    // Always clear frontend storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    // Redirect user to login page
    window.location.href = "/auth?mode=login";
  }
};

// ----------------------
// 4️⃣ Response interceptor
// ----------------------
axiosClient.interceptors.response.use(
  (response) => response, // If response is successful, return it
  async (error) => {
    const originalReq = error.config; // Save original request for retry

    // If access token expired and request not already retried
    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true; // Prevent infinite retry loop

      // Get refresh token and user from localStorage
      const refreshToken = localStorage.getItem("refreshToken");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (refreshToken) {
        try {
          // Attempt to refresh access token
          const res = await axios.post(`${apiUrl}auth/refresh`, {
            refreshToken,
          });

          // Save new access token
          localStorage.setItem("token", res.data.accessToken);

          // Update Authorization header for the original request
          originalReq.headers.Authorization = `Bearer ${res.data.accessToken}`;

          // Retry the original request with the new token
          return axiosClient(originalReq);
        } catch (err) {
          // Refresh failed → perform full logout
          await safeLogout(user.id);
        }
      } else {
        // No refresh token → logout
        await safeLogout(user.id);
      }
    }

    // If error is not 401 or retry failed, reject the promise
    return Promise.reject(error);
  }
);

export default axiosClient;
