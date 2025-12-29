// src/redux/services/cartApi.ts
import axiosClient from "@/utils/axiosClient";

export interface AddToCartPayload {
  productId: string;
  quantity?: number;
  color?: string | null;
  size?: string | null;
}

export interface UpdateCartPayload {
  productId: string;
  quantity: number;
}

export interface RemoveFromCartPayload {
  productId: string;
  color?: string | null;
  size?: string | null;
}

export const cartApi = {
  fetchCart: async () => {
    const res = await axiosClient.get("cart");
    return res.data;
  },

  addToCart: async ({
    productId,
    quantity = 1,
    color,
    size,
  }: AddToCartPayload) => {
    const res = await axiosClient.post("cart", {
      productId,
      quantity,
      color,
      size,
    });
    return res.data;
  },

  updateCart: async ({ productId, quantity }: UpdateCartPayload) => {
    const res = await axiosClient.put(`cart/${productId}`, {
      quantity,
    });
    return res.data;
  },

  removeFromCart: async ({ productId, color, size }: RemoveFromCartPayload) => {
    const res = await axiosClient.delete(`cart/${productId}`, {
      data: { color, size }, // DELETE requests in axios require `data` for body
    });
    return res.data;
  },

  clearCart: async () => {
    const res = await axiosClient.delete("cart");
    return res.data;
  },
};
