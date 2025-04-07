import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_METHODS } from '../api/apiMethods';
import { REGISTER_ENDPOINT, LOGIN_ENDPOINT } from '../api/endpoints';
import { apiRequest } from '../api/apiManager';
import { RootState } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const USER_STORAGE_KEY = '@user_data';

// Types
export interface User {
  id?: string;
  email: string;
  name: string;
  token?: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Helper functions for AsyncStorage
export const saveUserToStorage = async (user: User) => {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
};

export const removeUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Error removing user from storage:', error);
  }
};

export const getUserFromStorage = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user from storage:', error);
    return null;
  }
};

// Async thunks
export const register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await apiRequest<User>(
        API_METHODS.POST,
        REGISTER_ENDPOINT,
        userData
      );
      // Save user data to storage
      await saveUserToStorage(response);
      return response;
    } catch (error: any) {
      console.error("Failed to register:", error);
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await apiRequest<User>(
        API_METHODS.POST,
        LOGIN_ENDPOINT,
        credentials as any // Type assertion to bypass type checking for API request
      );
      
      // Save user data to storage
      await saveUserToStorage(response);
      
      return response;
    } catch (error: any) {
      console.error("Failed to login:", error);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Initialize auth state from storage
export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async () => {
    try {
      const user = await getUserFromStorage();
      return user;
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      return null;
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      // Remove user data from storage
      removeUserFromStorage();
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Initialize
      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer; 