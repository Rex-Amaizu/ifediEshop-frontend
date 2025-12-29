// src/redux/slices/orderSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderApi, OrderPayload } from "../services/orderApi";

export interface Order {
  _id: string;
  items: {
    product: string;
    quantity: number;
    price: number;
    selectedColor?: string | null;
    selectedSize?: string | null;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface OrderState {
  data: Order[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: OrderState = {
  data: [],
  loading: false,
  error: null,
  success: null,
};

/* =======================
      ASYNC THUNKS
======================= */

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await orderApi.fetchOrders();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

export const addOrder = createAsyncThunk(
  "orders/add",
  async (payload: OrderPayload, { rejectWithValue }) => {
    try {
      return await orderApi.addOrder(payload);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add order"
      );
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (orderId: string, { rejectWithValue }) => {
    try {
      return await orderApi.deleteOrder(orderId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete order"
      );
    }
  }
);

export const deleteAllOrders = createAsyncThunk(
  "orders/deleteAll",
  async (_, { rejectWithValue }) => {
    try {
      return await orderApi.deleteAllOrders();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete all orders"
      );
    }
  }
);

/* =======================
          SLICE
======================= */

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH ORDERS
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ADD ORDER
    builder
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE ONE ORDER
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE ALL ORDERS
    builder
      .addCase(deleteAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(deleteAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
