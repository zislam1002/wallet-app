import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Tag } from '../../components/Tag';
import { useAuthStore } from '../../store/authStore';
import { useWalletStore } from '../../store/walletStore';
import { api } from '../../api/client';
import { Wallet, Transaction } from '../../types';

export const HomeScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { user } = useAuthStore();
    const { wallets, transactions, setWallets, setTransactions } = useWalletStore();
    const [loading, setLoading] = useState(true);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        // Calculate total balance from all wallets
        const total = wallets.reduce((sum, wallet) => sum + wallet.balanceFiat, 0);
        setTotalBalance(total);
    }, [wallets]);

    const loadData = async () => {
        try {
            const [walletsData, transactionsData] = await Promise.all([
                api.getWallets(),
                api.getTransactions('all'),
            ]);
            setWallets(walletsData);
            setTransactions(transactionsData);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    const renderWalletCard = ({ item }: { item: Wallet }) => (
        <Card
            variant="elevated"
            onPress={() => navigation.navigate('Portfolio')}
            style={{
                ...styles.walletCard,
                backgroundColor: item.color || theme.colors.card,
                marginRight: theme.spacing.md,
            }}
        >
            <Text
                style={[
                    styles.walletChain,
                    {
                        fontSize: theme.fontSize.sm,
                        fontWeight: theme.fontWeight.semibold,
                        color: theme.colors.textSecondary,
                        marginBottom: theme.spacing.xs,
                    },
                ]}
            >
                {item.chainName}
            </Text>
            <Text
                style={[
                    styles.walletBalance,
                    {
                        fontSize: theme.fontSize.xl,
                        fontWeight: theme.fontWeight.bold,
                        color: theme.colors.text,
                        marginBottom: theme.spacing.xs,
                    },
                ]}
            >
                {formatCurrency(item.balanceFiat)}
            </Text>
            <Text
                style={[
                    styles.walletCrypto,
                    {
                        fontSize: theme.fontSize.sm,
                        color: theme.colors.textSecondary,
                    },
                ]}
            >
                {item.balanceCrypto}
            </Text>
        </Card>
    );

    const renderTransaction = ({ item }: { item: Transaction }) => (
        <Card
            variant="outlined"
            onPress={() => {
                // Navigate to transaction details
            }}
            style={{
                ...styles.transactionCard,
                marginBottom: theme.spacing.sm,
            }}
        >
            <View style={styles.transactionRow}>
                <View style={styles.transactionLeft}>
                    <View
                        style={[
                            styles.transactionIcon,
                            {
                                backgroundColor:
                                    item.type === 'receive'
                                        ? `${theme.colors.success}20`
                                        : `${theme.colors.primary}20`,
                                borderRadius: theme.borderRadius.md,
                                padding: theme.spacing.sm,
                                marginRight: theme.spacing.md,
                            },
                        ]}
                    >
                        <Text style={{ fontSize: 20 }}>
                            {item.type === 'receive' ? '↓' : item.type === 'send' ? '↑' : '⇄'}
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={[
                                styles.transactionTitle,
                                {
                                    fontSize: theme.fontSize.md,
                                    fontWeight: theme.fontWeight.semibold,
                                    color: theme.colors.text,
                                    marginBottom: 2,
                                },
                            ]}
                        >
                            {item.type === 'receive' ? 'Received' : item.type === 'send' ? 'Sent' : 'Swapped'}{' '}
                            {item.tokenSymbol}
                        </Text>
                        <Text
                            style={[
                                styles.transactionDate,
                                {
                                    fontSize: theme.fontSize.xs,
                                    color: theme.colors.textSecondary,
                                },
                            ]}
                        >
                            {formatDate(item.createdAt)}
                        </Text>
                    </View>
                </View>
                <View style={styles.transactionRight}>
                    <Text
                        style={[
                            styles.transactionAmount,
                            {
                                fontSize: theme.fontSize.md,
                                fontWeight: theme.fontWeight.semibold,
                                color: item.type === 'receive' ? theme.colors.success : theme.colors.text,
                                marginBottom: 2,
                            },
                        ]}
                    >
                        {item.type === 'receive' ? '+' : '-'}
                        {item.amount} {item.tokenSymbol}
                    </Text>
                    <Tag
                        label={item.status}
                        variant={
                            item.status === 'completed'
                                ? 'success'
                                : item.status === 'pending'
                                    ? 'warning'
                                    : 'error'
                        }
                    />
                </View>
            </View>
        </Card>
    );

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={styles.loadingContainer}>
                    <Text style={{ color: theme.colors.text }}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView>
                {/* Header */}
                <View style={[styles.header, { padding: theme.spacing.lg }]}>
                    <View style={styles.headerTop}>
                        <View>
                            <Text
                                style={[
                                    styles.greeting,
                                    {
                                        fontSize: theme.fontSize.md,
                                        color: theme.colors.textSecondary,
                                    },
                                ]}
                            >
                                Welcome back,
                            </Text>
                            <Text
                                style={[
                                    styles.userName,
                                    {
                                        fontSize: theme.fontSize.xl,
                                        fontWeight: theme.fontWeight.bold,
                                        color: theme.colors.text,
                                    },
                                ]}
                            >
                                {user?.name || 'User'}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.avatar,
                                {
                                    backgroundColor: theme.colors.primary,
                                    borderRadius: theme.borderRadius.full,
                                },
                            ]}
                            onPress={() => navigation.navigate('ProfileTab')}
                        >
                            <Text style={{ color: '#FFFFFF', fontSize: theme.fontSize.lg }}>
                                {user?.name?.[0] || 'U'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.balanceContainer, { marginTop: theme.spacing.lg }]}>
                        <Text
                            style={[
                                styles.balanceLabel,
                                {
                                    fontSize: theme.fontSize.sm,
                                    color: theme.colors.textSecondary,
                                    marginBottom: theme.spacing.xs,
                                },
                            ]}
                        >
                            Total Portfolio Value
                        </Text>
                        <Text
                            style={[
                                styles.balanceAmount,
                                {
                                    fontSize: theme.fontSize.xxxl,
                                    fontWeight: theme.fontWeight.bold,
                                    color: theme.colors.text,
                                },
                            ]}
                        >
                            {formatCurrency(totalBalance)}
                        </Text>
                    </View>
                </View>

                {/* Wallet Cards */}
                <View style={[styles.walletsSection, { paddingLeft: theme.spacing.lg }]}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                fontSize: theme.fontSize.lg,
                                fontWeight: theme.fontWeight.semibold,
                                color: theme.colors.text,
                                marginBottom: theme.spacing.md,
                            },
                        ]}
                    >
                        Your Wallets
                    </Text>
                    <FlatList
                        data={wallets}
                        renderItem={renderWalletCard}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* Quick Actions */}
                <View style={[styles.actionsSection, { padding: theme.spacing.lg }]}>
                    <View style={styles.actionsRow}>
                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                {
                                    backgroundColor: theme.colors.card,
                                    borderRadius: theme.borderRadius.lg,
                                    padding: theme.spacing.md,
                                    flex: 1,
                                    marginRight: theme.spacing.sm,
                                },
                            ]}
                            onPress={() => navigation.navigate('PaymentsTab', { screen: 'Send' })}
                        >
                            <Text style={{ fontSize: 24, marginBottom: theme.spacing.xs }}>↑</Text>
                            <Text
                                style={[
                                    styles.actionLabel,
                                    {
                                        fontSize: theme.fontSize.sm,
                                        fontWeight: theme.fontWeight.semibold,
                                        color: theme.colors.text,
                                    },
                                ]}
                            >
                                Send
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                {
                                    backgroundColor: theme.colors.card,
                                    borderRadius: theme.borderRadius.lg,
                                    padding: theme.spacing.md,
                                    flex: 1,
                                    marginRight: theme.spacing.sm,
                                },
                            ]}
                            onPress={() => navigation.navigate('PaymentsTab', { screen: 'Receive' })}
                        >
                            <Text style={{ fontSize: 24, marginBottom: theme.spacing.xs }}>↓</Text>
                            <Text
                                style={[
                                    styles.actionLabel,
                                    {
                                        fontSize: theme.fontSize.sm,
                                        fontWeight: theme.fontWeight.semibold,
                                        color: theme.colors.text,
                                    },
                                ]}
                            >
                                Receive
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                {
                                    backgroundColor: theme.colors.card,
                                    borderRadius: theme.borderRadius.lg,
                                    padding: theme.spacing.md,
                                    flex: 1,
                                    marginRight: theme.spacing.sm,
                                },
                            ]}
                            onPress={() => navigation.navigate('DiscoverTab', { screen: 'Swap' })}
                        >
                            <Text style={{ fontSize: 24, marginBottom: theme.spacing.xs }}>⇄</Text>
                            <Text
                                style={[
                                    styles.actionLabel,
                                    {
                                        fontSize: theme.fontSize.sm,
                                        fontWeight: theme.fontWeight.semibold,
                                        color: theme.colors.text,
                                    },
                                ]}
                            >
                                Swap
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                {
                                    backgroundColor: theme.colors.card,
                                    borderRadius: theme.borderRadius.lg,
                                    padding: theme.spacing.md,
                                    flex: 1,
                                },
                            ]}
                            onPress={() => navigation.navigate('DiscoverTab', { screen: 'Bridge' })}
                        >
                            <Ionicons name="git-network" size={28} color={theme.colors.primary} style={{ marginBottom: theme.spacing.xs }} />
                            <Text
                                style={[
                                    styles.actionLabel,
                                    {
                                        fontSize: theme.fontSize.sm,
                                        fontWeight: theme.fontWeight.semibold,
                                        color: theme.colors.text,
                                    },
                                ]}
                            >
                                Bridge
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recent Transactions */}
                <View style={[styles.transactionsSection, { padding: theme.spacing.lg }]}>
                    <View style={styles.sectionHeader}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    fontSize: theme.fontSize.lg,
                                    fontWeight: theme.fontWeight.semibold,
                                    color: theme.colors.text,
                                },
                            ]}
                        >
                            Recent Transactions
                        </Text>
                        <TouchableOpacity>
                            <Text
                                style={[
                                    styles.seeAll,
                                    {
                                        fontSize: theme.fontSize.sm,
                                        color: theme.colors.primary,
                                        fontWeight: theme.fontWeight.semibold,
                                    },
                                ]}
                            >
                                See All
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {transactions.length === 0 ? (
                        <View style={{ padding: theme.spacing.xl, alignItems: 'center' }}>
                            <Text style={{ color: theme.colors.textSecondary }}>
                                No transactions yet
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={transactions.slice(0, 10)}
                            renderItem={renderTransaction}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {},
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {},
    userName: {},
    avatar: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    balanceContainer: {},
    balanceLabel: {},
    balanceAmount: {},
    walletsSection: {
        marginVertical: 16,
    },
    sectionTitle: {},
    walletCard: {
        width: 200,
        minHeight: 120,
    },
    walletChain: {},
    walletBalance: {},
    walletCrypto: {},
    actionsSection: {},
    actionsRow: {
        flexDirection: 'row',
    },
    actionButton: {
        alignItems: 'center',
    },
    actionLabel: {},
    transactionsSection: {},
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    seeAll: {},
    transactionCard: {},
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    transactionIcon: {},
    transactionTitle: {},
    transactionDate: {},
    transactionRight: {
        alignItems: 'flex-end',
    },
    transactionAmount: {},
});
