/**
 * BeginnerTooltip - Contextual help tooltips for beginners
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

type BeginnerTooltipProps = {
    title: string;
    message: string;
    emoji?: string;
    onDismiss?: () => void;
    variant?: 'info' | 'success' | 'warning';
};

export const BeginnerTooltip: React.FC<BeginnerTooltipProps> = ({
    title,
    message,
    emoji = '💡',
    onDismiss,
    variant = 'info',
}) => {
    const { theme } = useTheme();

    const colors = {
        info: [theme.colors.primary, theme.colors.primaryDark],
        success: [theme.colors.success, '#059669'],
        warning: [theme.colors.warning, '#F59E0B'],
    };

    const bgColors = {
        info: `${theme.colors.primary}15`,
        success: `${theme.colors.success}15`,
        warning: `${theme.colors.warning}15`,
    };

    const borderColors = {
        info: `${theme.colors.primary}30`,
        success: `${theme.colors.success}30`,
        warning: `${theme.colors.warning}30`,
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: bgColors[variant],
                    borderLeftColor: variant === 'info' ? theme.colors.primary : variant === 'success' ? theme.colors.success : theme.colors.warning,
                    borderRadius: theme.borderRadius.md,
                    padding: theme.spacing.md,
                },
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ marginRight: theme.spacing.sm }}>
                    <Text style={{ fontSize: 20 }}>{emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.md,
                            fontWeight: theme.fontWeight.semibold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.xs,
                        }}
                    >
                        {title}
                    </Text>
                    <Text
                        style={{
                            fontSize: theme.fontSize.sm,
                            color: theme.colors.textSecondary,
                            lineHeight: 20,
                        }}
                    >
                        {message}
                    </Text>
                </View>
                {onDismiss && (
                    <TouchableOpacity onPress={onDismiss} style={{ marginLeft: theme.spacing.xs }}>
                        <Ionicons name="close" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
});
