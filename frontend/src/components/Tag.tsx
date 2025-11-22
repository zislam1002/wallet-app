import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { RiskLevel } from '../types';

interface TagProps {
    label: string;
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
    riskLevel?: RiskLevel;
    style?: ViewStyle;
}

export const Tag: React.FC<TagProps> = ({ label, variant = 'neutral', riskLevel, style }) => {
    const { theme } = useTheme();

    const getColors = () => {
        if (riskLevel) {
            switch (riskLevel) {
                case 'low':
                    return { bg: `${theme.colors.success}20`, text: theme.colors.success };
                case 'medium':
                    return { bg: `${theme.colors.warning}20`, text: theme.colors.warning };
                case 'high':
                    return { bg: `${theme.colors.error}20`, text: theme.colors.error };
            }
        }

        switch (variant) {
            case 'primary':
                return { bg: `${theme.colors.primary}20`, text: theme.colors.primary };
            case 'success':
                return { bg: `${theme.colors.success}20`, text: theme.colors.success };
            case 'warning':
                return { bg: `${theme.colors.warning}20`, text: theme.colors.warning };
            case 'error':
                return { bg: `${theme.colors.error}20`, text: theme.colors.error };
            default:
                return { bg: theme.colors.surface, text: theme.colors.textSecondary };
        }
    };

    const colors = getColors();

    return (
        <View
            style={[
                styles.tag,
                {
                    backgroundColor: colors.bg,
                    borderRadius: theme.borderRadius.sm,
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                },
                style,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    {
                        color: colors.text,
                        fontSize: theme.fontSize.xs,
                        fontWeight: theme.fontWeight.semibold,
                    },
                ]}
            >
                {label}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    tag: {
        alignSelf: 'flex-start',
    },
    text: {
        textTransform: 'uppercase',
    },
});
