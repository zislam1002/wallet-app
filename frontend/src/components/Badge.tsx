import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface BadgeProps {
    count: number;
    max?: number;
}

export const Badge: React.FC<BadgeProps> = ({ count, max = 99 }) => {
    const { theme } = useTheme();
    const displayCount = count > max ? `${max}+` : count.toString();

    if (count === 0) return null;

    return (
        <View
            style={[
                styles.badge,
                {
                    backgroundColor: theme.colors.error,
                    borderRadius: theme.borderRadius.full,
                    minWidth: 20,
                    height: 20,
                },
            ]}
        >
            <Text
                style={[
                    styles.text,
                    {
                        color: '#FFFFFF',
                        fontSize: theme.fontSize.xs,
                        fontWeight: theme.fontWeight.bold,
                    },
                ]}
            >
                {displayCount}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    text: {
        textAlign: 'center',
    },
});
