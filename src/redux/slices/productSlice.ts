// src/redux/slices/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productApi, CreateProductPayload } from "../services/productApi";
import { GrTextAlignLeft } from "react-icons/gr";

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
  amountSold: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  subCategory: string;
  gender: string;
  stock: Stock;
  colors: string[];
  sizes: string[];
  description: string;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  data: Product[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
  success: null,
};
// 🔥 Async Thunk
export const getAll = createAsyncThunk(
  "products/getAll",
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

export const createProduct = createAsyncThunk(
  "products/create",
  async (payload: CreateProductPayload, { rejectWithValue }) => {
    try {
      return await productApi.createProduct(payload);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // CREATE PRODUCT
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload.data); // newly added product
        state.success = action.payload.message;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
