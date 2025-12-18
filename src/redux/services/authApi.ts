// src/redux/services/authApi.ts
import axios from "axios";
import { apiUrl } from "@/utils/constants";
import axiosClient from "@/utils/axiosClient";

export const authApi = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => {
    const res = await axios.post(`${apiUrl}auth/register`, data);
    return res.data;
    // MUST RETURN: { message, user, token }
  },

  login: async (data: { email: string; password: string }) => {
    const res = await axiosClient.post(`${apiUrl}auth/login`, data);
    return res.data;
  },

  logout: async (token: string) => {
    const res = await axiosClient.post(
      `${apiUrl}auth/logout`,
      { refreshToken: token } // body
    );

    return res.data;
  },

  refresh: async (refreshToken: string) => {
    const res = await axios.post(`${apiUrl}auth/refresh`, {
      refreshToken,
    });
    return res.data; // { accessToken }
  },
};
