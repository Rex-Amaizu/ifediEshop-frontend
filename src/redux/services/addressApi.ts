// src/redux/services/addressApi.ts
import axiosClient from "@/utils/axiosClient";

export interface AddressPayload {
  fullName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  isDefault?: boolean;
}

export const addressApi = {
  fetchAddresses: async () => {
    const res = await axiosClient.get("address");
    return res.data; // { success, message, data }
  },

  addAddress: async (data: AddressPayload) => {
    const res = await axiosClient.post("address", data);
    return res.data;
  },

  updateAddress: async (addressId: string, data: AddressPayload) => {
    const res = await axiosClient.put(`address/${addressId}`, data);
    return res.data;
  },

  deleteAddress: async (addressId: string) => {
    const res = await axiosClient.delete(`address/${addressId}`);
    return res.data;
  },
};
