/**
 * Bridge Screen - Cross-chain asset transfers
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

export const BridgeScreen = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const { wallets } = useWalletStore();

    const [fromChain, setFromChain] = useState(wallets[0] || null);
    const [toChain, setToChain] = useState(wallets[1] || wallets[0] || null);
    const [selectedToken, setSelectedToken] = useState(fromChain?.tokens?.[0] || null);
    const [amount, setAmount] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('~5-10 minutes');
    const [bridgeFee, setBridgeFee] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (amount && parseFloat(amount) > 0) {
            // Mock bridge fee calculation (0.1% of amount)
            const fee = parseFloat(amount) * 0.001;
            setBridgeFee(fee);
        } else {
            setBridgeFee(0);
        }
    }, [amount]);

    const handleBridge = () => {
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert('Error', 'Please enter an amount to bridge');
            return;
        }

        if (parseFloat(amount) > parseFloat(selectedToken.balance)) {
            Alert.alert('Error', 'Insufficient balance');
            return;
        }

        if (fromChain.id === toChain.id) {
            Alert.alert('Error', 'Please select different chains');
            return;
        }

        setIsLoading(true);
        // Simulate bridge transaction
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(
                'Bridge Initiated!',
                `Bridging ${amount} ${selectedToken.symbol} from ${fromChain.chainName} to ${toChain.chainName}. This usually takes ${estimatedTime}.`,
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        }, 2000);
    };

    const switchChains = () => {
        const temp = fromChain;
        setFromChain(toChain);
        setToChain(temp);
        setAmount('');
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
                    Bridge
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Info Card */}
                <LinearGradient
                    colors={[`${theme.colors.secondary}15`, `${theme.colors.gradientMiddle}15`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        margin: theme.spacing.lg,
                        padding: theme.spacing.lg,
                        borderRadius: theme.borderRadius.lg,
                        borderWidth: 1,
                        borderColor: `${theme.colors.secondary}30`,
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <LinearGradient
                            colors={[theme.colors.secondary, theme.colors.gradientMiddle]}
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
                            <Ionicons name="git-network-outline" size={20} color="#fff" />
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
                                Cross-Chain Bridging
                            </Text>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.sm,
                                    color: theme.colors.textSecondary,
                                    lineHeight: 20,
                                }}
                            >
                                Move your assets between different blockchains securely. Takes 5-10 minutes on average.
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* From Chain */}
                <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.md }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.sm,
                            fontWeight: theme.fontWeight.semibold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.sm,
                        }}
                    >
                        From Chain
                    </Text>
                    <Card variant="elevated">
                        <View style={{ padding: theme.spacing.lg }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: fromChain.color || theme.colors.primary,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: theme.spacing.md,
                                    }}
                                >
                                    <Text style={{ fontSize: 18, color: '#fff' }}>{fromChain.chainName[0]}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.lg,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                        }}
                                    >
                                        {fromChain.chainName}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.xs,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        Chain ID: {fromChain.chainId}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => Alert.alert('Coming Soon', 'Chain selection')}
                                >
                                    <Ionicons name="chevron-down" size={24} color={theme.colors.text} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Switch Button */}
                <View style={{ alignItems: 'center', marginVertical: theme.spacing.sm }}>
                    <TouchableOpacity
                        onPress={switchChains}
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
                        <Ionicons name="arrow-down" size={24} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* To Chain */}
                <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.sm,
                            fontWeight: theme.fontWeight.semibold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.sm,
                        }}
                    >
                        To Chain
                    </Text>
                    <Card variant="elevated">
                        <View style={{ padding: theme.spacing.lg }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: toChain.color || theme.colors.success,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: theme.spacing.md,
                                    }}
                                >
                                    <Text style={{ fontSize: 18, color: '#fff' }}>{toChain.chainName[0]}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.lg,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                        }}
                                    >
                                        {toChain.chainName}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.xs,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        Chain ID: {toChain.chainId}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => Alert.alert('Coming Soon', 'Chain selection')}
                                >
                                    <Ionicons name="chevron-down" size={24} color={theme.colors.text} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Token & Amount */}
                <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.sm,
                            fontWeight: theme.fontWeight.semibold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.sm,
                        }}
                    >
                        Asset & Amount
                    </Text>
                    <Card variant="elevated">
                        <View style={{ padding: theme.spacing.lg }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
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
                                    <Text style={{ fontSize: 14 }}>{selectedToken?.symbol?.[0] || '?'}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.md,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                        }}
                                    >
                                        {selectedToken?.symbol || 'Select Token'}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.xs,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        {selectedToken?.name || ''}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => Alert.alert('Coming Soon', 'Token selection')}
                                >
                                    <Ionicons name="chevron-down" size={24} color={theme.colors.text} />
                                </TouchableOpacity>
                            </View>
                            <Input
                                value={amount}
                                onChangeText={setAmount}
                                placeholder="0.0"
                                keyboardType="numeric"
                                style={{ marginBottom: theme.spacing.xs }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: theme.fontSize.xs, color: theme.colors.textSecondary }}>
                                    Balance: {selectedToken?.balance || '0'} {selectedToken?.symbol || ''}
                                </Text>
                                <TouchableOpacity onPress={() => selectedToken && setAmount(selectedToken.balance)}>
                                    <Text style={{ fontSize: theme.fontSize.xs, color: theme.colors.primary, fontWeight: '600' }}>
                                        MAX
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Bridge Details */}
                {amount && parseFloat(amount) > 0 && (
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
                                You will receive
                            </Text>
                            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.text, fontWeight: '600' }}>
                                {(parseFloat(amount) - bridgeFee).toFixed(6)} {selectedToken?.symbol || ''}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.textSecondary }}>
                                Bridge Fee
                            </Text>
                            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.text, fontWeight: '600' }}>
                                {bridgeFee.toFixed(6)} {selectedToken?.symbol || ''}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.textSecondary }}>
                                Estimated Time
                            </Text>
                            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.text, fontWeight: '600' }}>
                                {estimatedTime}
                            </Text>
                        </View>
                    </Card>
                )}

                {/* Bridge Button */}
                <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.xl }}>
                    <Button
                        title={isLoading ? 'Bridging...' : 'Bridge Assets'}
                        onPress={handleBridge}
                        variant="primary"
                        fullWidth
                        disabled={!amount || parseFloat(amount) <= 0 || isLoading || fromChain.id === toChain.id}
                    />
                    {fromChain.id === toChain.id && (
                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: theme.spacing.sm,
                                fontSize: theme.fontSize.xs,
                                color: theme.colors.error,
                            }}
                        >
                            Please select different chains
                        </Text>
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
