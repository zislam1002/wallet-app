import { create } from "zustand";
import { ThemeMode, Currency, Language } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsState {
  themeMode: ThemeMode;
  currency: Currency;
  language: Language;
  notificationsEnabled: boolean;
  biometricsEnabled: boolean;

  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setCurrency: (currency: Currency) => Promise<void>;
  setLanguage: (language: Language) => Promise<void>;
  toggleNotifications: () => Promise<void>;
  toggleBiometrics: () => Promise<void>;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  themeMode: "system",
  currency: "USD",
  language: "en",
  notificationsEnabled: true,
  biometricsEnabled: false,

  setThemeMode: async (mode: ThemeMode) => {
    await AsyncStorage.setItem("theme_mode", mode);
    set({ themeMode: mode });
  },

  setCurrency: async (currency: Currency) => {
    await AsyncStorage.setItem("currency", currency);
    set({ currency });
  },

  setLanguage: async (language: Language) => {
    await AsyncStorage.setItem("language", language);
    set({ language });
  },

  toggleNotifications: async () => {
    const newValue = !get().notificationsEnabled;
    await AsyncStorage.setItem("notifications", JSON.stringify(newValue));
    set({ notificationsEnabled: newValue });
  },

  toggleBiometrics: async () => {
    const newValue = !get().biometricsEnabled;
    await AsyncStorage.setItem("biometrics", JSON.stringify(newValue));
    set({ biometricsEnabled: newValue });
  },

  loadSettings: async () => {
    try {
      const themeMode = (await AsyncStorage.getItem(
        "theme_mode"
      )) as ThemeMode | null;
      const currency = (await AsyncStorage.getItem(
        "currency"
      )) as Currency | null;
      const language = (await AsyncStorage.getItem(
        "language"
      )) as Language | null;
      const notifications = await AsyncStorage.getItem("notifications");
      const biometrics = await AsyncStorage.getItem("biometrics");

      if (themeMode) set({ themeMode });
      if (currency) set({ currency });
      if (language) set({ language });
      if (notifications)
        set({ notificationsEnabled: JSON.parse(notifications) });
      if (biometrics) set({ biometricsEnabled: JSON.parse(biometrics) });
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  },
}));
