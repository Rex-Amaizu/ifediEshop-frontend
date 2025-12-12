// src/redux/slices/categorySlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApi } from "../services/categoryApi";

export interface Category {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  creator: string;
}

interface CategoryState {
  data: Category[];
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: CategoryState = {
  data: [],
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  refreshToken:
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  loading: false,
  error: null,
  success: null,
};

// 🔥 Async Thunk
export const getAll = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await categoryApi.getAll();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "category",
  async (payload: any, { rejectWithValue }) => {
    // console.log("slicedata", data);
    try {
      return await categoryApi.createCategory(payload);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Some error Occured!"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async (data: { name: string; id: string }, { rejectWithValue }) => {
    try {
      return await categoryApi.updateCategory(data);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Some error Occured!"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      return await categoryApi.deleteCategory(id);
    } catch (err: any) {
      console.log("delErr", err);
      return rejectWithValue(
        err.response?.data?.message || "Some error Occured!"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload.data);
        state.success = action.payload.message;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const i = state.data.findIndex((c) => c._id === action.payload._id);
        if (i !== -1) state.data[i] = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((c) => c._id !== action.meta.arg);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
