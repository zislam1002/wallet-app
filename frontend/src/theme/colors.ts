/**
 * Theme configuration for Lykos Wallet
 * iOS-inspired design with clean, minimal aesthetics
 */

export const lightTheme = {
  colors: {
    primary: "#007AFF",
    secondary: "#5856D6",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",

    background: "#FFFFFF",
    surface: "#F2F2F7",
    card: "#FFFFFF",

    text: "#000000",
    textSecondary: "#8E8E93",
    textTertiary: "#C7C7CC",

    border: "#E5E5EA",
    divider: "#E5E5EA",

    overlay: "rgba(0, 0, 0, 0.5)",
    shadow: "rgba(0, 0, 0, 0.1)",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
};

export const darkTheme = {
  colors: {
    primary: "#0A84FF",
    secondary: "#5E5CE6",
    success: "#30D158",
    warning: "#FF9F0A",
    error: "#FF453A",

    background: "#000000",
    surface: "#1C1C1E",
    card: "#2C2C2E",

    text: "#FFFFFF",
    textSecondary: "#98989D",
    textTertiary: "#48484A",

    border: "#38383A",
    divider: "#38383A",

    overlay: "rgba(0, 0, 0, 0.7)",
    shadow: "rgba(0, 0, 0, 0.3)",
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  fontSize: lightTheme.fontSize,
  fontWeight: lightTheme.fontWeight,
};

export type Theme = typeof lightTheme;
