// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";

export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: AuthState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  refreshToken:
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  loading: false,
  error: null,
  success: null,
};

// --- REGISTER ---
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    data: { name: string; email: string; password: string; role?: string },
    { rejectWithValue }
  ) => {
    try {
      return await authApi.register(data); // expects { message, user, token }
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Registration failed"
      );
    }
  }
);

// --- LOGIN ---
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await authApi.login(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Login failed");
    }
  }
);

// --- LOGOUT ---
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (data: { token: string; userId: string }, { rejectWithValue }) => {
    try {
      return await authApi.logout(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // ---- REGISTER ----
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        const { message, user } = action.payload;

        // Save messages
        state.success = message;

        // Save to Redux
        // state.user = user;
        // state.token = token;

        // Persist
        // localStorage.setItem("user", JSON.stringify(user));
        // localStorage.setItem("token", token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ---- LOGIN ----
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        const { message, user, accessToken, refreshToken } = action.payload;
        state.success = message;
        state.user = user;
        state.token = accessToken; // your slice calls it token
        state.refreshToken = refreshToken;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ---- LOGOUT ----
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;

        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.success = "Logged out successfully";

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = authSlice.actions;
export default authSlice.reducer;
