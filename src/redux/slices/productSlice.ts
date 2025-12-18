// src/redux/slices/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  productApi,
  CreateProductPayload,
  UpdateProductPayload,
} from "../services/productApi";

export interface ProductCategory {
  id: string;
  name: string;
}

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

  // 🔥 FIXED
  category: ProductCategory[];

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
  singleProduct: Product | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ProductState = {
  data: [],
  singleProduct: null,
  loading: false,
  error: null,
  success: null,
};
// 🔥 Async Thunk
export const fetchProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await productApi.fetchProducts();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await productApi.fetchProduct(id);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async ({ productData, files }: CreateProductPayload, { rejectWithValue }) => {
    try {
      console.log("insideThunkData", productData);
      console.log("insideThunkFiles", files);
      return await productApi.createProduct({ productData, files });
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (
    { id, productData, files }: UpdateProductPayload,
    { rejectWithValue }
  ) => {
    try {
      return await productApi.updateProduct({ id, productData, files });
    } catch (err: any) {
      console.log("errrx", err);
      return rejectWithValue(
        err.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await productApi.deleteProduct(id);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch product"
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
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // GET SIINGLE PRODUCT
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
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
        state.success = action.payload.message;

        // Check if product already exists before pushing
        const newProduct = action.payload.data;
        const exists = state.data.some(
          (product) => product._id === newProduct._id
        );

        if (!exists) {
          state.data.push(newProduct);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE PRODUCT
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        // Update the existing product instead of pushing a new one
        const updatedProduct = action.payload.data;
        const index = state.data.findIndex(
          (product) => product._id === updatedProduct._id
        );

        if (index !== -1) {
          // Replace the existing product
          state.data[index] = updatedProduct;
        } else {
          // If product doesn't exist, add it (though this shouldn't happen for updates)
          state.data.push(updatedProduct);
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE SIINGLE PRODUCT
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.singleProduct = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
