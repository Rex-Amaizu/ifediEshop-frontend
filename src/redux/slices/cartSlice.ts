// src/redux/slices/cartSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  cartApi,
  AddToCartPayload,
  UpdateCartPayload,
  RemoveFromCartPayload,
} from "../services/cartApi";

export interface CartProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
}

export interface CartItem {
  _id: string;
  product: CartProduct;
  quantity: number;
  selectedColor: string | null;
  selectedSize: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CartState {
  data: CartItem[];
  totalAmount: number;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: CartState = {
  data: [],
  totalAmount: 0,
  loading: false,
  error: null,
  success: null,
};

/* =======================
   ASYNC THUNKS
======================= */

export const fetchCart = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      return await cartApi.fetchCart();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async (
    { productId, quantity = 1, color, size }: AddToCartPayload,
    { rejectWithValue }
  ) => {
    try {
      return await cartApi.addToCart({ productId, quantity, color, size });
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }: UpdateCartPayload, { rejectWithValue }) => {
    try {
      return await cartApi.updateCart({ productId, quantity });
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update cart"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (
    { productId, color, size }: RemoveFromCartPayload,
    { rejectWithValue }
  ) => {
    try {
      return await cartApi.removeFromCart({ productId, color, size });
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      return await cartApi.clearCart();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

/* =======================
   SLICE
======================= */

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET CART
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.items;
        state.totalAmount = action.payload.data.totalAmount;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ADD TO CART
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.data = action.payload.data.items;
        state.totalAmount = action.payload.data.totalAmount;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE CART
    builder
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.items;
        state.totalAmount = action.payload.data.totalAmount;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // REMOVE ITEM
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.items;
        state.totalAmount = action.payload.data.totalAmount;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // CLEAR CART
    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.data = [];
        state.totalAmount = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
