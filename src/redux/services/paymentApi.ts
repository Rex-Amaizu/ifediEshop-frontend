import axiosClient from "@/utils/axiosClient";

export interface InitPaymentPayload {
  email: string | undefined;
  amount: number;
  metadata?: Record<string, any>;
}

export const paymentApi = {
  initialize: async (payload: InitPaymentPayload) => {
    const res = await axiosClient.post("payment/initialize", payload);
    return res.data;
  },

  verify: async (reference: string) => {
    const res = await axiosClient.get(`payment/verify/${reference}`);
    return res.data;
  },
};
