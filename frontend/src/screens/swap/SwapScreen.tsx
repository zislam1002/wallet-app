/**
 * Swap Screen - Token exchange powered by Euclid Protocol
 */

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useWalletStore } from '../../store/walletStore';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export const SwapScreen = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const { wallets } = useWalletStore();

    const allTokens = wallets.flatMap((wallet) =>
        wallet.tokens.map((token) => ({
            ...token,
            chainName: wallet.chainName,
            chainId: wallet.chainId,
        }))
    );

    const [fromToken, setFromToken] = useState(allTokens[0] || null);
    const [toToken, setToToken] = useState(allTokens[1] || null);
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [rate, setRate] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(true);

    useEffect(() => {
        if (fromAmount && parseFloat(fromAmount) > 0) {
            // Mock exchange rate calculation
            const mockRate = 0.95 + Math.random() * 0.1;
            setRate(mockRate);
            setToAmount((parseFloat(fromAmount) * mockRate).toFixed(6));
        } else {
            setToAmount('');
        }
    }, [fromAmount, fromToken, toToken]);

    const handleSwap = () => {
        if (!fromAmount || parseFloat(fromAmount) <= 0) {
            Alert.alert('Error', 'Please enter an amount to swap');
            return;
        }

        if (parseFloat(fromAmount) > parseFloat(fromToken.balance)) {
            Alert.alert('Error', 'Insufficient balance');
            return;
        }

        setIsLoading(true);
        // Simulate swap transaction
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(
                'Success!',
                `Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        }, 2000);
    };

    const switchTokens = () => {
        const temp = fromToken;
        setFromToken(toToken);
        setToToken(temp);
        setFromAmount('');
        setToAmount('');
    };

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
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.xl,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.colors.text,
                        }}
                    >
                        Swap
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Alert.alert('Settings', 'Slippage and gas settings')}>
                    <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Info Card */}
                <LinearGradient
                    colors={[`${theme.colors.gradientStart}15`, `${theme.colors.gradientEnd}15`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        margin: theme.spacing.lg,
                        padding: theme.spacing.lg,
                        borderRadius: theme.borderRadius.lg,
                        borderWidth: 1,
                        borderColor: `${theme.colors.primary}30`,
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <LinearGradient
                            colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: theme.spacing.md,
                            }}
                        >
                            <Ionicons name="swap-horizontal" size={20} color="#fff" />
                        </LinearGradient>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.md,
                                    fontWeight: theme.fontWeight.bold,
                                    color: theme.colors.text,
                                    marginBottom: theme.spacing.xs,
                                }}
                            >
                                How Swaps Work
                            </Text>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.sm,
                                    color: theme.colors.textSecondary,
                                    lineHeight: 20,
                                }}
                            >
                                Exchange one crypto for another instantly. We find you the best rates across multiple exchanges.
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* From Token */}
                <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.md }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.sm,
                            fontWeight: theme.fontWeight.semibold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.sm,
                        }}
                    >
                        You Pay
                    </Text>
                    <Card variant="elevated">
                        <View style={{ padding: theme.spacing.lg }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: `${theme.colors.primary}20`,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: theme.spacing.md,
                                    }}
                                >
                                    <Text style={{ fontSize: 18 }}>{fromToken?.symbol?.[0] || '?'}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.lg,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                        }}
                                    >
                                        {fromToken?.symbol || 'Select Token'}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.xs,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        {fromToken?.chainName || ''}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => Alert.alert('Coming Soon', 'Token selection')}
                                >
                                    <Ionicons name="chevron-down" size={24} color={theme.colors.text} />
                                </TouchableOpacity>
                            </View>
                            <Input
                                value={fromAmount}
                                onChangeText={setFromAmount}
                                placeholder="0.0"
                                keyboardType="numeric"
                                style={{ marginBottom: theme.spacing.xs }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: theme.fontSize.xs, color: theme.colors.textSecondary }}>
                                    Balance: {fromToken?.balance || '0'} {fromToken?.symbol || ''}
                                </Text>
                                <TouchableOpacity onPress={() => fromToken && setFromAmount(fromToken.balance)}>
                                    <Text style={{ fontSize: theme.fontSize.xs, color: theme.colors.primary, fontWeight: '600' }}>
                                        MAX
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Switch Button */}
                <View style={{ alignItems: 'center', marginVertical: theme.spacing.sm }}>
                    <TouchableOpacity
                        onPress={switchTokens}
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 24,
                            backgroundColor: theme.colors.card,
                            borderWidth: 2,
                            borderColor: theme.colors.border,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons name="swap-vertical" size={24} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* To Token */}
                <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.sm,
                            fontWeight: theme.fontWeight.semibold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.sm,
                        }}
                    >
                        You Receive
                    </Text>
                    <Card variant="elevated">
                        <View style={{ padding: theme.spacing.lg }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: `${theme.colors.success}20`,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: theme.spacing.md,
                                    }}
                                >
                                    <Text style={{ fontSize: 18 }}>{toToken?.symbol?.[0] || '?'}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.lg,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                        }}
                                    >
                                        {toToken?.symbol || 'Select Token'}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.xs,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        {toToken?.chainName || ''}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => Alert.alert('Coming Soon', 'Token selection')}
                                >
                                    <Ionicons name="chevron-down" size={24} color={theme.colors.text} />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    backgroundColor: theme.colors.background,
                                    padding: theme.spacing.md,
                                    borderRadius: theme.borderRadius.md,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: theme.fontSize.xl,
                                        fontWeight: theme.fontWeight.semibold,
                                        color: theme.colors.text,
                                    }}
                                >
                                    {toAmount || '0.0'}
                                </Text>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Rate Info */}
                {fromAmount && toAmount && (
                    <Card
                        variant="outlined"
                        style={{
                            marginHorizontal: theme.spacing.lg,
                            marginBottom: theme.spacing.lg,
                            padding: theme.spacing.md,
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.textSecondary }}>
                                Exchange Rate
                            </Text>
                            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.text, fontWeight: '600' }}>
                                1 {fromToken?.symbol || ''} = {rate.toFixed(4)} {toToken?.symbol || ''}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.textSecondary }}>
                                Network Fee
                            </Text>
                            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.success, fontWeight: '600' }}>
                                Gas Free ⚡
                            </Text>
                        </View>
                    </Card>
                )}

                {/* Swap Button */}
                <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.xl }}>
                    <Button
                        title={isLoading ? 'Swapping...' : 'Swap Tokens'}
                        onPress={handleSwap}
                        variant="primary"
                        fullWidth
                        disabled={!fromAmount || parseFloat(fromAmount) <= 0 || isLoading}
                    />
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
