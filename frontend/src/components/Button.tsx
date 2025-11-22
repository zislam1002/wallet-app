import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
    style,
    textStyle,
}) => {
    const { theme } = useTheme();

    const getBackgroundColor = () => {
        if (disabled) return theme.colors.textTertiary;

        switch (variant) {
            case 'primary':
                return theme.colors.primary;
            case 'secondary':
                return theme.colors.secondary;
            case 'outline':
            case 'ghost':
                return 'transparent';
            default:
                return theme.colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return theme.colors.textSecondary;

        switch (variant) {
            case 'primary':
            case 'secondary':
                return '#FFFFFF';
            case 'outline':
            case 'ghost':
                return theme.colors.primary;
            default:
                return '#FFFFFF';
        }
    };

    const getPadding = () => {
        switch (size) {
            case 'small':
                return { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md };
            case 'large':
                return { paddingVertical: theme.spacing.lg, paddingHorizontal: theme.spacing.xl };
            default:
                return { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.lg };
        }
    };

    const getFontSize = () => {
        switch (size) {
            case 'small':
                return theme.fontSize.sm;
            case 'large':
                return theme.fontSize.lg;
            default:
                return theme.fontSize.md;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                {
                    backgroundColor: getBackgroundColor(),
                    borderRadius: theme.borderRadius.md,
                    borderWidth: variant === 'outline' ? 2 : 0,
                    borderColor: variant === 'outline' ? theme.colors.primary : 'transparent',
                    ...getPadding(),
                    width: fullWidth ? '100%' : 'auto',
                    opacity: disabled ? 0.5 : 1,
                },
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text
                    style={[
                        styles.text,
                        {
                            color: getTextColor(),
                            fontSize: getFontSize(),
                            fontWeight: theme.fontWeight.semibold,
                        },
                        textStyle,
                    ]}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
    },
});
