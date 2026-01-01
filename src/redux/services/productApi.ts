// src/redux/services/productApi.ts
import { apiUrl } from "@/utils/constants";
import axiosClient from "@/utils/axiosClient";

export interface CreateProductPayload {
  productData: Record<string, any>;
  files: File[];
}
export interface UpdateProductPayload {
  id: string;
  productData: Record<string, any>;
  files: File[];
}

export const productApi = {
  createProduct: async ({ productData, files }: CreateProductPayload) => {
    const formData = new FormData();

    Object.entries(productData).forEach(([key, value]) => {
      if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    files.forEach((file) => {
      formData.append("images", file);
    });

    const res = await axiosClient.post("product", formData);
    return res.data;
  },

  fetchProducts: async () => {
    const res = await axiosClient.get("product");
    return res.data; // array of products
  },

  fetchProduct: async (id: string) => {
    const res = await axiosClient.get(`product/${id}`);
    return res.data; // array of products
  },

  updateProduct: async ({ id, productData, files }: UpdateProductPayload) => {
    const formData = new FormData();

    Object.entries(productData).forEach(([key, value]) => {
      if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });
    if (files) {
      files.forEach((file) => {
        formData.append("images", file);
      });
    }

    const res = await axiosClient.put(`product/${id}`, formData);
    return res.data;
  },

  deductStock: async (id: string, quantity: number) => {
    const res = await axiosClient.put(`product/${id}/deduct-stock`, {
      quantity,
    });
    return res.data;
  },

  deleteProduct: async (id: string) => {
    const res = await axiosClient.delete(`product/${id}`);
    return res.data; // array of products
  },
};
