// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";

// --- TYPES ---
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

// --- HELPERS FOR SSR ---
const getInitialUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

const getInitialToken = (): string | null =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const getInitialRefreshToken = (): string | null =>
  typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;

// --- INITIAL STATE ---
const initialState: AuthState = {
  user: getInitialUser(),
  token: getInitialToken(),
  refreshToken: getInitialRefreshToken(),
  loading: false,
  error: null,
  success: null,
};

// --- ASYNC THUNKS ---
// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    data: { name: string; email: string; password: string; role?: string },
    { rejectWithValue }
  ) => {
    try {
      return await authApi.register(data); // { message, user, token }
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Registration failed"
      );
    }
  }
);

// LOGIN
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

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (token: string, { rejectWithValue }) => {
    try {
      return await authApi.logout(token);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Logout failed");
    }
  }
);

// REFRESH TOKEN
export const refreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      if (typeof window === "undefined") throw new Error("No window object");

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token found");

      return await authApi.refresh(refreshToken);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Token refresh failed"
      );
    }
  }
);

// --- SLICE ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.success = null;
    },
    updateToken(state, action) {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const { message } = action.payload;
        state.success = message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // LOGIN
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
        state.token = accessToken;
        state.refreshToken = refreshToken;

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // LOGOUT
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

        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // REFRESH TOKEN
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        const { accessToken } = action.payload;
        state.token = accessToken;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", accessToken);
        }
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateToken, clearMessages } = authSlice.actions;
export default authSlice.reducer;
