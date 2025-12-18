import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeProvider';

interface CardProps {
    children: ReactNode;
    onPress?: () => void;
    style?: ViewStyle;
    variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
    children,
    onPress,
    style,
    variant = 'default',
}) => {
    const { theme } = useTheme();

    const cardStyle: ViewStyle = {
        backgroundColor: variant === 'outlined' ? 'transparent' : `${theme.colors.card}E6`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        borderWidth: variant === 'outlined' ? 1 : 0.5,
        borderColor: variant === 'outlined' ? theme.colors.border : 'rgba(255, 255, 255, 0.2)',
        shadowColor: variant === 'elevated' ? theme.colors.shadow : 'transparent',
        shadowOffset: {
            width: 0,
            height: variant === 'elevated' ? 8 : 2,
        },
        shadowOpacity: variant === 'elevated' ? 0.25 : 0.1,
        shadowRadius: variant === 'elevated' ? 16 : 8,
        elevation: variant === 'elevated' ? 8 : 2,
        overflow: 'hidden',
    };

    const content = (
        <View style={{ padding: theme.spacing.md }}>
            {children}
        </View>
    );

    const glassContainer = (
        <View style={[cardStyle, style]}>
            {Platform.OS !== 'web' && variant !== 'outlined' ? (
                <BlurView intensity={20} tint={theme.colors.text === '#F8FAFC' ? 'dark' : 'light'} style={{ flex: 1 }}>
                    {content}
                </BlurView>
            ) : (
                content
            )}
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
            >
                {glassContainer}
            </TouchableOpacity>
        );
    }

    return glassContainer;
};
