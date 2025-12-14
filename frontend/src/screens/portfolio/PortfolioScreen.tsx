/**
 * Portfolio Screen - View detailed wallet holdings and performance
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useWalletStore } from '../../store/walletStore';
import { Card } from '../../components/Card';
import { Tag } from '../../components/Tag';

export const PortfolioScreen = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const { wallets } = useWalletStore();
    const [selectedPeriod, setSelectedPeriod] = useState<'24h' | '7d' | '30d' | '1y'>('24h');

    const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balanceFiat, 0);
    const totalTokens = wallets.reduce((sum, wallet) => sum + wallet.tokens.length, 0);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const getPeriodChange = () => {
        // Mock percentage changes based on period
        const changes = { '24h': 2.5, '7d': 8.3, '30d': -3.2, '1y': 45.7 };
        return changes[selectedPeriod];
    };

    const change = getPeriodChange();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { padding: theme.spacing.lg, borderBottomColor: theme.colors.border }]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text
                    style={[
                        styles.headerTitle,
                        {
                            fontSize: theme.fontSize.xl,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.colors.text,
                        },
                    ]}
                >
                    Portfolio
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Total Portfolio Value */}
                <LinearGradient
                    colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        margin: theme.spacing.lg,
                        padding: theme.spacing.xl,
                        borderRadius: theme.borderRadius.lg,
                        shadowColor: theme.colors.primary,
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.3,
                        shadowRadius: 16,
                        elevation: 12,
                    }}
                >
                    <Text
                        style={{
                            fontSize: theme.fontSize.sm,
                            color: 'rgba(255,255,255,0.85)',
                            marginBottom: theme.spacing.xs,
                            fontWeight: '500',
                        }}
                    >
                        Total Portfolio Value
                    </Text>
                    <Text
                        style={{
                            fontSize: 42,
                            fontWeight: theme.fontWeight.bold,
                            color: '#FFFFFF',
                            marginBottom: theme.spacing.sm,
                            letterSpacing: -1,
                        }}
                    >
                        {formatCurrency(totalBalance)}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons
                            name={change >= 0 ? 'trending-up' : 'trending-down'}
                            size={16}
                            color="#fff"
                        />
                        <Text
                            style={{
                                fontSize: theme.fontSize.sm,
                                color: '#FFFFFF',
                                marginLeft: 4,
                                fontWeight: '600',
                            }}
                        >
                            {change >= 0 ? '+' : ''}{change}% {selectedPeriod}
                        </Text>
                    </View>
                </LinearGradient>

                {/* Period Selector */}
                <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {(['24h', '7d', '30d', '1y'] as const).map((period) => (
                            <TouchableOpacity
                                key={period}
                                onPress={() => setSelectedPeriod(period)}
                                style={{
                                    paddingVertical: theme.spacing.sm,
                                    paddingHorizontal: theme.spacing.lg,
                                    borderRadius: theme.borderRadius.md,
                                    backgroundColor:
                                        selectedPeriod === period
                                            ? theme.colors.primary
                                            : theme.colors.card,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: theme.fontSize.sm,
                                        fontWeight: theme.fontWeight.semibold,
                                        color:
                                            selectedPeriod === period
                                                ? '#FFFFFF'
                                                : theme.colors.textSecondary,
                                    }}
                                >
                                    {period}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Quick Stats */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: theme.spacing.lg,
                        marginBottom: theme.spacing.lg,
                        gap: theme.spacing.md,
                    }}
                >
                    <Card variant="elevated" style={{ flex: 1, padding: theme.spacing.md }}>
                        <Text
                            style={{
                                fontSize: theme.fontSize.xs,
                                color: theme.colors.textSecondary,
                                marginBottom: 4,
                            }}
                        >
                            Wallets
                        </Text>
                        <Text
                            style={{
                                fontSize: theme.fontSize.xl,
                                fontWeight: theme.fontWeight.bold,
                                color: theme.colors.text,
                            }}
                        >
                            {wallets.length}
                        </Text>
                    </Card>
                    <Card variant="elevated" style={{ flex: 1, padding: theme.spacing.md }}>
                        <Text
                            style={{
                                fontSize: theme.fontSize.xs,
                                color: theme.colors.textSecondary,
                                marginBottom: 4,
                            }}
                        >
                            Assets
                        </Text>
                        <Text
                            style={{
                                fontSize: theme.fontSize.xl,
                                fontWeight: theme.fontWeight.bold,
                                color: theme.colors.text,
                            }}
                        >
                            {totalTokens}
                        </Text>
                    </Card>
                </View>

                {/* Holdings by Chain */}
                <View style={{ paddingHorizontal: theme.spacing.lg }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.lg,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        Holdings by Chain
                    </Text>

                    {wallets.map((wallet) => (
                        <Card
                            key={wallet.id}
                            variant="elevated"
                            style={{ marginBottom: theme.spacing.md }}
                        >
                            <View style={{ padding: theme.spacing.lg }}>
                                {/* Chain Header */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: theme.spacing.md,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            backgroundColor: wallet.color || theme.colors.primary,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: theme.spacing.md,
                                        }}
                                    >
                                        <Text style={{ fontSize: 20, color: '#fff' }}>
                                            {wallet.chainName[0]}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                fontSize: theme.fontSize.lg,
                                                fontWeight: theme.fontWeight.bold,
                                                color: theme.colors.text,
                                            }}
                                        >
                                            {wallet.chainName}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: theme.fontSize.sm,
                                                color: theme.colors.textSecondary,
                                            }}
                                        >
                                            {formatCurrency(wallet.balanceFiat)}
                                        </Text>
                                    </View>
                                    <Tag
                                        label={`${wallet.tokens.length} assets`}
                                        variant="neutral"
                                    />
                                </View>

                                {/* Token List */}
                                {wallet.tokens.map((token, index) => (
                                    <View
                                        key={token.id}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: theme.spacing.sm,
                                            borderTopWidth: index === 0 ? 0 : 1,
                                            borderTopColor: theme.colors.border,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: 16,
                                                backgroundColor: `${theme.colors.primary}20`,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: theme.spacing.md,
                                            }}
                                        >
                                            <Text style={{ fontSize: 14 }}>{token.symbol[0]}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text
                                                style={{
                                                    fontSize: theme.fontSize.md,
                                                    fontWeight: theme.fontWeight.semibold,
                                                    color: theme.colors.text,
                                                }}
                                            >
                                                {token.symbol}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: theme.fontSize.xs,
                                                    color: theme.colors.textSecondary,
                                                }}
                                            >
                                                {token.name}
                                            </Text>
                                        </View>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text
                                                style={{
                                                    fontSize: theme.fontSize.md,
                                                    fontWeight: theme.fontWeight.semibold,
                                                    color: theme.colors.text,
                                                }}
                                            >
                                                {token.balance} {token.symbol}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: theme.fontSize.xs,
                                                    color: theme.colors.textSecondary,
                                                }}
                                            >
                                                {formatCurrency(token.fiatValue)}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </Card>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
    },
});
