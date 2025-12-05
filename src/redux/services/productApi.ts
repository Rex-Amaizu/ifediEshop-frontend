// src/redux/services/productApi.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api/product"; // change for production

export const productApi = {
  getAll: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },
};
