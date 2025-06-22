import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";
import type { AuthState, User } from "../types";

const API_URL = import.meta.env.VITE_API_URL;
interface LoginResponse {
  user: User;
  token: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

type AuthStore = AuthState & {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  clearError: () => void;
};

// Create the auth store
const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Login user
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post<LoginResponse>(
            `${API_URL}/auth/login`,
            { email, password }
          );
          const { user, token } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
          });

          // Set default auth header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Store token and user in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          toast.success("Login successful!");
          return true;
        } catch (error) {
          const err = error as ErrorResponse;
          const message = err.response?.data?.message || "Login failed";
          set({ error: message, loading: false });
          toast.error(message);
          return false;
        }
      },

      // Register user
      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post<LoginResponse>(
            `${API_URL}/auth/register`,
            userData
          );
          const { user, token } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
          });

          // Set default auth header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Store token and user in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          toast.success("Registration successful!");
          return true;
        } catch (error) {
          const err = error as ErrorResponse;
          const message = err.response?.data?.message || "Registration failed";
          set({ error: message, loading: false });
          toast.error(message);
          return false;
        }
      },

      // Logout user
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });

        // Remove token from axios headers
        delete axios.defaults.headers.common["Authorization"];

        // Clear auth data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged out successfully");
      },

      // Check authentication status by verifying the token in localStorage
      checkAuth: async () => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        if (!token || !userStr) {
          return false;
        }

        try {
          // Parse the stored user data
          const user = JSON.parse(userStr);
          
          // Set the token in axios headers for future requests
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Update the store with the stored user and token
          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
          });

          return true;
        } catch (error) {
          console.error("Error during authentication check:", error);
          // Clear invalid data on error
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return false;
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
