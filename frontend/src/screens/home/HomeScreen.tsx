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
import MaskedView from '@react-native-masked-view/masked-view';
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
    const { user, greeting } = useAuthStore();
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

    const capitalizeFirstLetter = (text: string) => {
        if (!text) return text;
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

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
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    paddingTop: 60,
                    borderBottomLeftRadius: 32,
                    borderBottomRightRadius: 32,
                }}
            >
                <View style={{ padding: theme.spacing.xl, paddingTop: 0 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.sm,
                                    color: 'rgba(255,255,255,0.85)',
                                    fontWeight: '500',
                                    marginBottom: 4,
                                }}
                            >
                                {greeting}
                            </Text>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.xxl,
                                    fontWeight: theme.fontWeight.bold,
                                    color: '#FFFFFF',
                                    letterSpacing: -0.5,
                                }}
                            >
                                {capitalizeFirstLetter(user?.name || 'User')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 28,
                                backgroundColor: 'rgba(255,255,255,0.25)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: 'rgba(255,255,255,0.4)',
                            }}
                            onPress={() => navigation.navigate('ProfileTab')}
                        >
                            <Text style={{ color: '#FFFFFF', fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold }}>
                                {user?.name?.[0] || 'U'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: theme.spacing.lg }}>

                {/* Buy & Sell - Stacked Vertically */}
                <View style={{
                    flex: 1,
                    paddingHorizontal: theme.spacing.lg,
                    paddingTop: theme.spacing.xl,
                    gap: theme.spacing.md
                }}>
                    {/* Buy Button */}
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            borderWidth: 2,
                            borderColor: theme.colors.border,
                            borderRadius: theme.borderRadius.lg,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: theme.spacing.xl * 2,
                        }}
                        onPress={() => navigation.navigate('DiscoverTab', { screen: 'Discover', params: { focusSearch: true } })}
                    >
                        <MaskedView
                            maskElement={
                                <Text style={{
                                    fontSize: 64,
                                    fontWeight: theme.fontWeight.bold,
                                    backgroundColor: 'transparent'
                                }}>
                                    Buy
                                </Text>
                            }
                        >
                            <LinearGradient
                                colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Text style={{
                                    fontSize: 64,
                                    fontWeight: theme.fontWeight.bold,
                                    opacity: 0
                                }}>
                                    Buy
                                </Text>
                            </LinearGradient>
                        </MaskedView>
                    </TouchableOpacity>

                    {/* Sell Button */}
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            borderWidth: 2,
                            borderColor: theme.colors.border,
                            borderRadius: theme.borderRadius.lg,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: theme.spacing.xl * 2,
                        }}
                        onPress={() => navigation.navigate('DiscoverTab', { screen: 'Discover', params: { focusSearch: true } })}
                    >
                        <MaskedView
                            maskElement={
                                <Text style={{
                                    fontSize: 64,
                                    fontWeight: theme.fontWeight.bold,
                                    backgroundColor: 'transparent'
                                }}>
                                    Sell
                                </Text>
                            }
                        >
                            <LinearGradient
                                colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Text style={{
                                    fontSize: 64,
                                    fontWeight: theme.fontWeight.bold,
                                    opacity: 0
                                }}>
                                    Sell
                                </Text>
                            </LinearGradient>
                        </MaskedView>
                    </TouchableOpacity>
                </View>

                {/* Recent Activity */}
                <View style={{ padding: theme.spacing.lg, paddingTop: theme.spacing.xl }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md }}>
                        <Text style={{
                            fontSize: theme.fontSize.lg,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.colors.text,
                        }}>
                            Recent Activity
                        </Text>
                        <TouchableOpacity>
                            <Text style={{
                                fontSize: theme.fontSize.sm,
                                color: theme.colors.primary,
                                fontWeight: theme.fontWeight.semibold,
                            }}>
                                View All
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {transactions.length === 0 ? (
                        <Card variant="outlined" style={{ padding: theme.spacing.xl, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, marginBottom: theme.spacing.sm }}>📭</Text>
                            <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text, marginBottom: theme.spacing.xs }}>
                                No Activity Yet
                            </Text>
                            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 20 }}>
                                Once you send or receive crypto, you'll see your transactions here
                            </Text>
                        </Card>
                    ) : (
                        <View>
                            {transactions.slice(0, 5).map((transaction) => (
                                <Card
                                    key={transaction.id}
                                    variant="outlined"
                                    onPress={() => { }}
                                    style={{ marginBottom: theme.spacing.sm }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                            <View style={{
                                                backgroundColor: transaction.type === 'receive' ? `${theme.colors.success}20` : `${theme.colors.primary}20`,
                                                borderRadius: theme.borderRadius.md,
                                                padding: theme.spacing.sm,
                                                marginRight: theme.spacing.md,
                                            }}>
                                                <Text style={{ fontSize: 20 }}>
                                                    {transaction.type === 'receive' ? '↓' : transaction.type === 'send' ? '↑' : '⇄'}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{
                                                    fontSize: theme.fontSize.md,
                                                    fontWeight: theme.fontWeight.semibold,
                                                    color: theme.colors.text,
                                                    marginBottom: 2,
                                                }}>
                                                    {transaction.type === 'receive' ? 'Received' : transaction.type === 'send' ? 'Sent' : 'Swapped'} {transaction.tokenSymbol}
                                                </Text>
                                                <Text style={{
                                                    fontSize: theme.fontSize.xs,
                                                    color: theme.colors.textSecondary,
                                                }}>
                                                    {formatDate(transaction.createdAt)}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={{
                                                fontSize: theme.fontSize.md,
                                                fontWeight: theme.fontWeight.semibold,
                                                color: transaction.type === 'receive' ? theme.colors.success : theme.colors.text,
                                                marginBottom: 2,
                                            }}>
                                                {transaction.type === 'receive' ? '+' : '-'}{transaction.amount} {transaction.tokenSymbol}
                                            </Text>
                                            <Tag
                                                label={transaction.status}
                                                variant={transaction.status === 'completed' ? 'success' : transaction.status === 'pending' ? 'warning' : 'error'}
                                            />
                                        </View>
                                    </View>
                                </Card>
                            ))}
                        </View>
                    )}
                </View>

                {/* Bottom Padding */}
                <View style={{ height: 40 }} />
            </ScrollView>

        </View>
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
