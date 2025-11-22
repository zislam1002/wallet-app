import { create } from "zustand";
import { User } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  loadAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: async (user: User, token: string) => {
    try {
      await AsyncStorage.setItem("auth_token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error("Error saving auth data:", error);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("auth_token");
      await AsyncStorage.removeItem("user");
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error("Error clearing auth data:", error);
    }
  },

  updateUser: (updates: Partial<User>) => {
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, ...updates };
      set({ user: updatedUser });
      AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    }
  },

  loadAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const userStr = await AsyncStorage.getItem("user");

      if (token && userStr) {
        const user = JSON.parse(userStr);
        set({ user, token, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
      set({ isLoading: false });
    }
  },
}));
