/**
 * Discover Screen - Search and manage tokens, NFTs, and RWAs
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { Card } from '../../components/Card';
import { useAuthStore } from '../../store/authStore';
import { useWalletStore } from '../../store/walletStore';

export const DiscoverScreen = ({ navigation, route }: any) => {
    const { theme } = useTheme();
    const { user, greeting } = useAuthStore();
    const { wallets } = useWalletStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTokens, setSelectedTokens] = useState<string[]>(['ETH', 'BTC']);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchInputRef = useRef<TextInput>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const searchBarRef = useRef<View>(null);

    useEffect(() => {
        if (route?.params?.focusSearch) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [route?.params?.focusSearch]);

    const capitalizeFirstLetter = (text: string) => {
        if (!text) return text;
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balanceFiat, 0);

    const tokenTypes = [
        { id: 'token', name: 'Token', icon: 'cash-outline' },
        { id: 'nft', name: 'NFT', icon: 'image-outline' },
        { id: 'rwa', name: 'RWA', icon: 'business-outline' },
    ];

    const mockWallets = [
        { id: '1', chainName: 'Ethereum', balanceCrypto: '2.45 ETH', balanceFiat: 5234.50 },
        { id: '2', chainName: 'Bitcoin', balanceCrypto: '0.125 BTC', balanceFiat: 4821.75 },
        { id: '3', chainName: 'Tether', balanceCrypto: '1,250 USDT', balanceFiat: 1250.00 },
        { id: '4', chainName: 'USD Coin', balanceCrypto: '850 USDC', balanceFiat: 850.00 },
    ];

    const formatCurrency = (amount: number) => {
        return `$${amount.toFixed(2)}`;
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View style={{ padding: theme.spacing.lg }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.lg }}>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.md,
                                    color: theme.colors.textSecondary,
                                }}
                            >
                                {greeting}
                            </Text>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.xl,
                                    fontWeight: theme.fontWeight.bold,
                                    color: theme.colors.text,
                                }}
                            >
                                {capitalizeFirstLetter(user?.name || 'User')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: theme.borderRadius.full,
                                backgroundColor: theme.colors.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => navigation.navigate('ProfileTab')}
                        >
                            <Text style={{ color: '#FFFFFF', fontSize: theme.fontSize.lg }}>
                                {user?.name?.[0] || 'U'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Balance Card - Gradient */}
                    <LinearGradient
                        colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            padding: theme.spacing.xl,
                            borderRadius: theme.borderRadius.lg,
                            marginBottom: theme.spacing.lg,
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

                    {/* Your Crypto Wallet Section */}
                    <Card
                        variant="elevated"
                        style={{
                            marginBottom: theme.spacing.lg,
                            backgroundColor: theme.colors.card,
                        }}
                    >
                        <View style={{ padding: theme.spacing.lg }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: theme.spacing.md
                            }}>
                                <View style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: `${theme.colors.primary}15`,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: theme.spacing.sm,
                                }}>
                                    <Ionicons name="wallet-outline" size={22} color={theme.colors.primary} />
                                </View>
                                <Text
                                    style={{
                                        fontSize: theme.fontSize.lg,
                                        fontWeight: theme.fontWeight.bold,
                                        color: theme.colors.text,
                                    }}
                                >
                                    Your Crypto Wallet
                                </Text>
                            </View>

                            {mockWallets.map((wallet, index) => (
                                <TouchableOpacity
                                    key={wallet.id}
                                    onPress={() => navigation.navigate('Portfolio')}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingVertical: theme.spacing.sm,
                                        paddingHorizontal: theme.spacing.md,
                                        backgroundColor: theme.colors.surface,
                                        borderRadius: theme.borderRadius.md,
                                        marginBottom: index < mockWallets.length - 1 ? theme.spacing.xs : 0,
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                fontSize: theme.fontSize.md,
                                                fontWeight: theme.fontWeight.semibold,
                                                color: theme.colors.text,
                                                marginBottom: 2,
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
                                            {wallet.balanceCrypto}
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.lg,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                        }}
                                    >
                                        {formatCurrency(wallet.balanceFiat)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Card>

                    {/* Search Bar */}
                    <View ref={searchBarRef} style={{ marginBottom: theme.spacing.md }}>
                        <View
                            style={{
                                backgroundColor: theme.colors.card,
                                borderRadius: theme.borderRadius.md,
                                padding: theme.spacing.md,
                                borderWidth: 1,
                                borderColor: searchQuery.length > 0 ? theme.colors.primary : theme.colors.border,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={{ marginRight: theme.spacing.sm }} />
                            <TextInput
                                ref={searchInputRef}
                                placeholder="Search tokens, NFTs, RWAs..."
                                placeholderTextColor={theme.colors.textSecondary}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onFocus={() => {
                                    setIsSearchFocused(true);
                                    setTimeout(() => {
                                        scrollViewRef.current?.scrollToEnd({ animated: true });
                                    }, 100);
                                }}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
                                style={{
                                    flex: 1,
                                    fontSize: theme.fontSize.md,
                                    color: theme.colors.text,
                                }}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery('')}>
                                    <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Dropdown Results */}
                        {isSearchFocused && (
                            <Card
                                variant="elevated"
                                style={{
                                    marginTop: theme.spacing.xs,
                                    maxHeight: 300,
                                }}
                            >
                                <ScrollView>
                                    {tokenTypes.map((type, index) => (
                                        <TouchableOpacity
                                            key={type.id}
                                            onPress={() => {
                                                setSearchQuery('');
                                                navigation.navigate('TokenSearch', { type: type.name });
                                            }}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                padding: theme.spacing.md,
                                                borderBottomWidth: index < tokenTypes.length - 1 ? 1 : 0,
                                                borderBottomColor: theme.colors.border,
                                            }}
                                        >
                                            <View style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20,
                                                backgroundColor: `${theme.colors.primary}15`,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: theme.spacing.md,
                                            }}>
                                                <Ionicons
                                                    name={type.icon as any}
                                                    size={20}
                                                    color={theme.colors.primary}
                                                />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text
                                                    style={{
                                                        fontSize: theme.fontSize.md,
                                                        color: theme.colors.text,
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    {type.name}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: theme.fontSize.sm,
                                                        color: theme.colors.textSecondary,
                                                    }}
                                                >
                                                    Search for {type.name.toLowerCase()}s
                                                </Text>
                                            </View>
                                            <Ionicons
                                                name="chevron-forward"
                                                size={20}
                                                color={theme.colors.textSecondary}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </Card>
                        )}
                    </View>



                    {/* Action Buttons - Circular with Gradients */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: theme.spacing.md }}>
                        <TouchableOpacity
                            style={{ alignItems: 'center', flex: 1 }}
                            onPress={() => navigation.navigate('Send')}
                        >
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
                                    shadowColor: theme.colors.primary,
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 8,
                                }}
                            >
                                <Ionicons name="arrow-up" size={28} color="#FFFFFF" />
                            </LinearGradient>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.sm,
                                    fontWeight: theme.fontWeight.semibold,
                                    color: theme.colors.text,
                                }}
                            >
                                Send
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ alignItems: 'center', flex: 1 }}
                            onPress={() => navigation.navigate('Receive')}
                        >
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
                                    shadowColor: theme.colors.primary,
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 8,
                                }}
                            >
                                <Ionicons name="arrow-down" size={28} color="#FFFFFF" />
                            </LinearGradient>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.sm,
                                    fontWeight: theme.fontWeight.semibold,
                                    color: theme.colors.text,
                                }}
                            >
                                Receive
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ alignItems: 'center', flex: 1 }}
                            onPress={() => navigation.navigate('Swap')}
                        >
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
                                    shadowColor: theme.colors.secondary,
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 8,
                                }}
                            >
                                <Ionicons name="swap-horizontal" size={28} color="#FFFFFF" />
                            </LinearGradient>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.sm,
                                    fontWeight: theme.fontWeight.semibold,
                                    color: theme.colors.text,
                                }}
                            >
                                Swap
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bottom Padding */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
