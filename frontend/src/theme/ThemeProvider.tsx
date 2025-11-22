import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, Theme } from './colors';
import { useSettingsStore } from '../store/settingsStore';

interface ThemeContextType {
    theme: Theme;
    isDark: boolean;
    setTheme: (mode: 'light' | 'dark' | 'auto') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const { themeMode, setThemeMode } = useSettingsStore();

    const isDark = themeMode === 'system'
        ? systemColorScheme === 'dark'
        : themeMode === 'dark';

    const theme = isDark ? darkTheme : lightTheme;

    const setTheme = (mode: 'light' | 'dark' | 'auto') => {
        setThemeMode(mode === 'auto' ? 'system' : mode);
    };

    return (
        <ThemeContext.Provider value={{ theme, isDark, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
