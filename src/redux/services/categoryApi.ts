// src/redux/services/categoryApi.ts
import axios from "axios";
import { apiUrl } from "@/utils/constants";
import axiosClient from "@/utils/axiosClient";

export const categoryApi = {
  createCategory: async (payload: any) => {
    console.log("pp", payload);
    const res = await axiosClient.post(
      `${apiUrl}category`,
      payload // body
    );

    return res.data;
  },

  getAll: async () => {
    const res = await axiosClient.get(`${apiUrl}category`);
    return res.data;
  },

  updateCategory: async (data: { name: string; id: string }) => {
    const res = await axiosClient.put(
      `${apiUrl}category/${data.id}`,
      { name: data.name } // body
    );

    return res.data;
  },

  deleteCategory: async (id: string) => {
    const res = await axiosClient.delete(
      `${apiUrl}category/${id}` // body
    );

    return res.data;
  },
};
