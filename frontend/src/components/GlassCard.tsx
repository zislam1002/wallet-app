/**
 * GlassCard - Apple-style liquid glass morphism card
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';

type GlassCardProps = {
    children: React.ReactNode;
    style?: ViewStyle;
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
    variant?: 'standard' | 'elevated' | 'outlined';
};

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    style,
    intensity = 80,
    tint = 'default',
    variant = 'standard',
}) => {
    const { theme, isDark } = useTheme();

    const blurTint = tint === 'default' ? (isDark ? 'dark' : 'light') : tint;

    return (
        <View
            style={[
                styles.container,
                {
                    borderRadius: theme.borderRadius.lg,
                    overflow: 'hidden',
                    shadowColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 8,
                },
                style,
            ]}
        >
            {/* Blur background layer */}
            <BlurView
                intensity={intensity}
                tint={blurTint}
                style={StyleSheet.absoluteFill}
            />

            {/* Gradient overlay for depth */}
            <LinearGradient
                colors={
                    isDark
                        ? ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
                        : ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.1)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            {/* Inner glow effect */}
            <View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        borderRadius: theme.borderRadius.lg,
                        borderWidth: 1,
                        borderColor: isDark
                            ? 'rgba(255, 255, 255, 0.15)'
                            : 'rgba(255, 255, 255, 0.5)',
                    },
                ]}
            />

            {/* Content */}
            <View style={styles.content}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    content: {
        position: 'relative',
        zIndex: 10,
    },
});
