import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Animated,
    Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
    const [fabOpen, setFabOpen] = useState(false);
    const [showBeginnerTip, setShowBeginnerTip] = useState(true);
    const fabAnim = useRef(new Animated.Value(0)).current;

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

    const toggleFab = () => {
        const toValue = fabOpen ? 0 : 1;
        Animated.timing(fabAnim, {
            toValue,
            duration: 240,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
        setFabOpen(!fabOpen);
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
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={[styles.header, { padding: theme.spacing.lg }]}>
                    <View style={styles.headerTop}>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={[
                                    styles.greeting,
                                    {
                                        fontSize: theme.fontSize.md,
                                        color: theme.colors.textSecondary,
                                    },
                                ]}
                            >
                                👋 Welcome back,
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

                    {/* Balance Card */}
                    <LinearGradient
                        colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            marginTop: theme.spacing.lg,
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
                                fontWeight: '500',
                                marginBottom: 4,
                            }}
                        >
                            Total Balance
                        </Text>
                        <Text
                            style={{
                                fontSize: 48,
                                fontWeight: theme.fontWeight.bold,
                                color: '#FFFFFF',
                                letterSpacing: -1.5,
                            }}
                        >
                            {formatCurrency(totalBalance)}
                        </Text>
                    </LinearGradient>
                </View>

                {/* Beginner Tip Card */}
                {showBeginnerTip && (
                    <View style={{ padding: theme.spacing.lg, paddingTop: theme.spacing.md }}>
                        <Card
                            variant="elevated"
                            style={{
                                backgroundColor: `${theme.colors.primary}10`,
                                borderLeftWidth: 4,
                                borderLeftColor: theme.colors.primary,
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View style={{ marginRight: theme.spacing.md }}>
                                    <Text style={{ fontSize: 24 }}>💡</Text>
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
                                        New to crypto?
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.sm,
                                            color: theme.colors.textSecondary,
                                            lineHeight: 20,
                                            marginBottom: theme.spacing.sm,
                                        }}
                                    >
                                        Start by receiving your first crypto. Tap "Receive" below to get your wallet address.
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setShowBeginnerTip(false)}
                                        style={{ alignSelf: 'flex-start' }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: theme.fontSize.sm,
                                                color: theme.colors.primary,
                                                fontWeight: theme.fontWeight.semibold,
                                            }}
                                        >
                                            Got it!
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    </View>
                )}

                {/* Quick Actions */}
                <View style={{ padding: theme.spacing.lg, paddingTop: showBeginnerTip ? 0 : theme.spacing.md }}>
                    <View style={{ flexDirection: 'row', gap: theme.spacing.md, marginBottom: theme.spacing.lg }}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => navigation.navigate('PaymentsTab', { screen: 'Send' })}
                        >
                            <Card variant="elevated" style={{ padding: theme.spacing.lg, alignItems: 'center' }}>
                                <LinearGradient
                                    colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: theme.spacing.sm,
                                    }}
                                >
                                    <Ionicons name="arrow-up" size={28} color="#fff" />
                                </LinearGradient>
                                <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text }}>
                                    Send
                                </Text>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => navigation.navigate('PaymentsTab', { screen: 'Receive' })}
                        >
                            <Card variant="elevated" style={{ padding: theme.spacing.lg, alignItems: 'center' }}>
                                <LinearGradient
                                    colors={[theme.colors.success, theme.colors.gradientMiddle]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: theme.spacing.sm,
                                    }}
                                >
                                    <Ionicons name="arrow-down" size={28} color="#fff" />
                                </LinearGradient>
                                <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text }}>
                                    Receive
                                </Text>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => navigation.navigate('DiscoverTab', { screen: 'Swap' })}
                        >
                            <Card variant="elevated" style={{ padding: theme.spacing.lg, alignItems: 'center' }}>
                                <LinearGradient
                                    colors={[theme.colors.secondary, theme.colors.gradientEnd]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: theme.spacing.sm,
                                    }}
                                >
                                    <Ionicons name="swap-horizontal" size={28} color="#fff" />
                                </LinearGradient>
                                <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text }}>
                                    Swap
                                </Text>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Your Wallets Section - Simplified */}
                <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.md }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
                        <Text
                            style={{
                                fontSize: theme.fontSize.lg,
                                fontWeight: theme.fontWeight.bold,
                                color: theme.colors.text,
                                flex: 1,
                            }}
                        >
                            Your Crypto Wallets
                        </Text>
                        <View style={{
                            backgroundColor: theme.colors.card,
                            borderRadius: 12,
                            paddingHorizontal: 8,
                            paddingVertical: 4
                        }}>
                            <Text style={{ fontSize: 10, color: theme.colors.textSecondary, fontWeight: '600' }}>
                                Different types of coins
                            </Text>
                        </View>
                    </View>
                    <FlatList
                        data={wallets}
                        renderItem={renderWalletCard}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: theme.spacing.lg }}
                    />
                </View>



                {/* Recent Activity */}
                <View style={[styles.transactionsSection, { padding: theme.spacing.lg, paddingTop: 0 }]}>
                    <View style={styles.sectionHeader}>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.lg,
                                    fontWeight: theme.fontWeight.bold,
                                    color: theme.colors.text,
                                    marginBottom: 2,
                                }}
                            >
                                Recent Activity
                            </Text>
                            <Text style={{ fontSize: theme.fontSize.xs, color: theme.colors.textSecondary }}>
                                Your transaction history
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.sm,
                                    color: theme.colors.primary,
                                    fontWeight: theme.fontWeight.semibold,
                                }}
                            >
                                View All
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {transactions.length === 0 ? (
                        <Card variant="outlined" style={{ padding: theme.spacing.xl, alignItems: 'center', marginTop: theme.spacing.md }}>
                            <Text style={{ fontSize: 40, marginBottom: theme.spacing.sm }}>📭</Text>
                            <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text, marginBottom: theme.spacing.xs }}>
                                No Activity Yet
                            </Text>
                            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 20 }}>
                                Once you send or receive crypto, you'll see your transactions here
                            </Text>
                            <Button
                                title="Get Started - Receive Crypto"
                                onPress={() => navigation.navigate('PaymentsTab', { screen: 'Receive' })}
                                variant="primary"
                                size="small"
                                style={{ marginTop: theme.spacing.md }}
                            />
                        </Card>
                    ) : (
                        <View style={{ marginTop: theme.spacing.sm }}>
                            <FlatList
                                data={transactions.slice(0, 5)}
                                renderItem={renderTransaction}
                                keyExtractor={(item) => item.id}
                                scrollEnabled={false}
                            />
                        </View>
                    )}
                </View>

                {/* Bottom Padding for FAB */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Help Button - Bottom Left */}
            <TouchableOpacity
                style={[
                    styles.helpButton,
                    {
                        backgroundColor: theme.colors.card,
                        borderWidth: 1,
                        borderColor: theme.colors.border,
                    },
                ]}
                onPress={() => navigation.navigate('Learn')}
            >
                <Ionicons name="help-circle" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
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
    /* Help Button */
    helpButton: {
        position: 'absolute',
        left: 20,
        bottom: 28,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
});
