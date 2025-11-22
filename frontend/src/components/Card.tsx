import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
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
        backgroundColor: variant === 'outlined' ? 'transparent' : theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        borderWidth: variant === 'outlined' ? 1 : 0,
        borderColor: theme.colors.border,
        shadowColor: variant === 'elevated' ? theme.colors.shadow : 'transparent',
        shadowOffset: {
            width: 0,
            height: variant === 'elevated' ? 4 : 0,
        },
        shadowOpacity: variant === 'elevated' ? 0.15 : 0,
        shadowRadius: variant === 'elevated' ? 8 : 0,
        elevation: variant === 'elevated' ? 4 : 0,
    };

    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                style={[cardStyle, style]}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={[cardStyle, style]}>{children}</View>;
};
