import React, { useState } from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    ViewStyle,
    TextInputProps,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    containerStyle,
    ...textInputProps
}) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text
                    style={[
                        styles.label,
                        {
                            color: theme.colors.text,
                            fontSize: theme.fontSize.sm,
                            marginBottom: theme.spacing.xs,
                        },
                    ]}
                >
                    {label}
                </Text>
            )}
            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: theme.colors.surface,
                        borderRadius: theme.borderRadius.md,
                        borderWidth: 1,
                        borderColor: error
                            ? theme.colors.error
                            : isFocused
                                ? theme.colors.primary
                                : theme.colors.border,
                        paddingHorizontal: theme.spacing.md,
                        paddingVertical: theme.spacing.sm,
                    },
                ]}
            >
                {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
                <TextInput
                    {...textInputProps}
                    style={[
                        styles.input,
                        {
                            color: theme.colors.text,
                            fontSize: theme.fontSize.md,
                        },
                        textInputProps.style,
                    ]}
                    placeholderTextColor={theme.colors.textSecondary}
                    onFocus={(e) => {
                        setIsFocused(true);
                        textInputProps.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        textInputProps.onBlur?.(e);
                    }}
                />
                {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
            </View>
            {error && (
                <Text
                    style={[
                        styles.error,
                        {
                            color: theme.colors.error,
                            fontSize: theme.fontSize.xs,
                            marginTop: theme.spacing.xs,
                        },
                    ]}
                >
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        paddingVertical: 8,
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    error: {
        fontWeight: '400',
    },
});
