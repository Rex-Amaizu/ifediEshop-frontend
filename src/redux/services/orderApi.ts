// src/redux/services/orderApi.ts
import axiosClient from "@/utils/axiosClient";

export type PaymentMethod = "paystack" | "fincra";

export interface OrderShippingAddress {
  fullName: string | undefined;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

export interface OrderItemPayload {
  product: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

export interface OrderPayload {
  items: OrderItemPayload[];

  shippingAddress: OrderShippingAddress;

  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";

  subtotal: number;
  shippingFee: number;
  totalAmount: number;
}

export const orderApi = {
  fetchOrders: async () => {
    const res = await axiosClient.get("order");
    return res.data;
  },

  addOrder: async (data: OrderPayload) => {
    const res = await axiosClient.post("order", data);
    return res.data;
  },

  deleteOrder: async (orderId: string) => {
    const res = await axiosClient.delete(`order/${orderId}`);
    return res.data;
  },

  deleteAllOrders: async () => {
    const res = await axiosClient.delete("order");
    return res.data;
  },
};
