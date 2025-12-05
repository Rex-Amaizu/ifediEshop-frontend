// src/redux/services/categoryApi.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api/category"; // change for production

export const categoryApi = {
  getAll: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },
};
