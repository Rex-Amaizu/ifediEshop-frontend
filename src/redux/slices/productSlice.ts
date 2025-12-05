// src/redux/slices/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "../services/productApi";

export interface Review {
  userName: string;
  rating: number;
  review: string;
}

export interface Stock {
  total: number;
  sold: number;
  damaged: number;
  returned: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;

  images: string[];

  category: string;
  subCategory: string;
  gender: string;

  stock: Stock; // <-- correct stock type
  colors: string[];
  sizes: string[];

  description: string;

  reviews: Review[]; // <-- correct reviews type
}

interface ProductState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

// 🔥 Async Thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await productApi.getAll();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
