// src/redux/services/productApi.ts
import { apiUrl } from "@/utils/constants";
import axiosClient from "@/utils/axiosClient";

export interface CreateProductPayload {
  productData: Record<string, any>;
  files: File[];
}

export const productApi = {
  createProduct: async ({ productData, files }: CreateProductPayload) => {
    const formData = new FormData();

    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    files.forEach((file) => {
      formData.append("images", file);
    });

    const res = await axiosClient.post(`${apiUrl}product`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data; // { message, data: product }
  },

  getAll: async () => {
    const res = await axiosClient.get(`${apiUrl}product`);
    return res.data; // array of products
  },
};
