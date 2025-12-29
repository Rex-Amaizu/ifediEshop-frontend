// src/redux/slices/addressSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addressApi, AddressPayload } from "../services/addressApi";

export interface Address {
  _id: string;
  fullName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  isDefault?: boolean;
}

interface AddressState {
  data: Address[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: AddressState = {
  data: [],
  loading: false,
  error: null,
  success: null,
};

/* =======================
      ASYNC THUNKS
======================= */

export const fetchAddresses = createAsyncThunk(
  "address/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await addressApi.fetchAddresses();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch addresses"
      );
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/add",
  async (payload: AddressPayload, { rejectWithValue }) => {
    try {
      return await addressApi.addAddress(payload);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add address"
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update",
  async (
    { addressId, data }: { addressId: string; data: AddressPayload },
    { rejectWithValue }
  ) => {
    try {
      return await addressApi.updateAddress(addressId, data);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update address"
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (addressId: string, { rejectWithValue }) => {
    try {
      return await addressApi.deleteAddress(addressId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete address"
      );
    }
  }
);

/* =======================
          SLICE
======================= */

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.success = action.payload.message;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ADD
    builder
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.success = action.payload.message;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE
    builder
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.success = action.payload.message;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE
    builder
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.success = action.payload.message;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default addressSlice.reducer;
