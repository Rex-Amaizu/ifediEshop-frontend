import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { paymentApi, InitPaymentPayload } from "../services/paymentApi";

interface PaymentState {
  loading: boolean;
  error: string | null;
  verifyData: any;
  initData: any;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  initData: null,
  verifyData: null,
};

export const initializePayment = createAsyncThunk(
  "payment/initialize",
  async (payload: InitPaymentPayload, { rejectWithValue }) => {
    try {
      return await paymentApi.initialize(payload);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async (reference: string, { rejectWithValue }) => {
    try {
      return await paymentApi.verify(reference);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Initialize
      .addCase(initializePayment.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(initializePayment.fulfilled, (s, action) => {
        s.loading = false;
        s.initData = action.payload.data;
      })
      .addCase(initializePayment.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string;
      })

      // Verify
      .addCase(verifyPayment.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(verifyPayment.fulfilled, (s, action) => {
        s.loading = false;
        s.verifyData = action.payload.data;
      })
      .addCase(verifyPayment.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string;
      });
  },
});

export default paymentSlice.reducer;
