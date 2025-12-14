/**
 * Theme configuration for Lykos Wallet
 * Modern gradient-based design with vibrant colors
 */

export const lightTheme = {
  colors: {
    primary: "#6366F1",
    primaryLight: "#818CF8",
    primaryDark: "#4F46E5",
    secondary: "#EC4899",
    secondaryLight: "#F472B6",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",

    background: "#F9FAFB",
    surface: "#F3F4F6",
    card: "#FFFFFF",

    text: "#111827",
    textSecondary: "#6B7280",
    textTertiary: "#D1D5DB",

    border: "#E5E7EB",
    divider: "#E5E7EB",

    overlay: "rgba(0, 0, 0, 0.5)",
    shadow: "rgba(0, 0, 0, 0.1)",

    // Gradient colors
    gradientStart: "#6366F1",
    gradientMiddle: "#8B5CF6",
    gradientEnd: "#EC4899",
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
    primary: "#818CF8",
    primaryLight: "#A5B4FC",
    primaryDark: "#6366F1",
    secondary: "#F472B6",
    secondaryLight: "#F9A8D4",
    success: "#34D399",
    warning: "#FBBF24",
    error: "#F87171",

    background: "#0A0E1A",
    surface: "#151B2E",
    card: "#1E2538",

    text: "#F8FAFC",
    textSecondary: "#CBD5E1",
    textTertiary: "#64748B",

    border: "#2D3748",
    divider: "#2D3748",

    overlay: "rgba(0, 0, 0, 0.7)",
    shadow: "rgba(0, 0, 0, 0.5)",

    // Gradient colors - more vibrant for dark mode
    gradientStart: "#818CF8",
    gradientMiddle: "#A78BFA",
    gradientEnd: "#F472B6",
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  fontSize: lightTheme.fontSize,
  fontWeight: lightTheme.fontWeight,
};

export type Theme = typeof lightTheme;
