/**
 * Send Screen - Send crypto to another address
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useWalletStore } from '../../store/walletStore';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Tag } from '../../components/Tag';

export const SendScreen = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const { wallets } = useWalletStore();

    const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
    const [selectedToken, setSelectedToken] = useState(selectedWallet?.tokens[0]);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!recipientAddress || !amount) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(
                'Success',
                `Sent ${amount} ${selectedToken?.symbol} to ${recipientAddress.substring(0, 10)}...`,
                [{
                    text: 'OK', onPress: () => {
                        setRecipientAddress('');
                        setAmount('');
                    }
                }]
            );
        }, 2000);
    };

    const handleMax = () => {
        if (selectedToken) {
            setAmount(selectedToken.balance);
        }
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Send</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Wallet Selection */}
                <Text style={[styles.label, { color: theme.colors.text }]}>
                    From Wallet
                </Text>
                <Card
                    variant="elevated"
                    style={{
                        padding: theme.spacing.lg,
                        marginBottom: theme.spacing.lg,
                    }}
                >
                    <View style={styles.walletInfo}>
                        <View>
                            <Text
                                style={[
                                    styles.walletName,
                                    { color: theme.colors.text },
                                ]}
                            >
                                {selectedWallet?.chainName}
                            </Text>
                            <Text
                                style={[
                                    styles.walletAddress,
                                    { color: theme.colors.textSecondary },
                                ]}
                            >
                                {selectedWallet?.address.substring(0, 10)}...
                                {selectedWallet?.address.substring(
                                    selectedWallet.address.length - 8
                                )}
                            </Text>
                        </View>
                        <Text
                            style={[
                                styles.walletBalance,
                                { color: theme.colors.text },
                            ]}
                        >
                            ${selectedWallet?.balanceFiat.toFixed(2)}
                        </Text>
                    </View>
                </Card>

                {/* Token Selection */}
                <Text style={[styles.label, { color: theme.colors.text }]}>
                    Select Token
                </Text>
                <View style={styles.tokenGrid}>
                    {selectedWallet?.tokens.map((token) => (
                        <TouchableOpacity
                            key={token.id}
                            onPress={() => setSelectedToken(token)}
                        >
                            <Card
                                variant={
                                    selectedToken?.id === token.id ? 'elevated' : 'outlined'
                                }
                                style={{
                                    padding: theme.spacing.md,
                                    borderColor:
                                        selectedToken?.id === token.id
                                            ? theme.colors.primary
                                            : theme.colors.border,
                                    borderWidth: selectedToken?.id === token.id ? 2 : 1,
                                }}
                            >
                                <Text
                                    style={[
                                        styles.tokenSymbol,
                                        {
                                            color:
                                                selectedToken?.id === token.id
                                                    ? theme.colors.primary
                                                    : theme.colors.text,
                                        },
                                    ]}
                                >
                                    {token.symbol}
                                </Text>
                                <Text
                                    style={[
                                        styles.tokenBalance,
                                        { color: theme.colors.textSecondary },
                                    ]}
                                >
                                    {token.balance}
                                </Text>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Recipient Address */}
                <Text
                    style={[
                        styles.label,
                        { color: theme.colors.text, marginTop: theme.spacing.lg },
                    ]}
                >
                    Recipient Address
                </Text>
                <Input
                    value={recipientAddress}
                    onChangeText={setRecipientAddress}
                    placeholder="0x..."
                    autoCapitalize="none"
                    rightIcon={
                        <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'QR Scanner')}>
                            <Ionicons
                                name="qr-code"
                                size={24}
                                color={theme.colors.primary}
                            />
                        </TouchableOpacity>
                    }
                />

                {/* Amount */}
                <Text
                    style={[
                        styles.label,
                        { color: theme.colors.text, marginTop: theme.spacing.lg },
                    ]}
                >
                    Amount
                </Text>
                <Input
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="0.0"
                    keyboardType="decimal-pad"
                    rightIcon={
                        <TouchableOpacity
                            style={[
                                styles.maxButton,
                                { backgroundColor: theme.colors.primary },
                            ]}
                            onPress={handleMax}
                        >
                            <Text style={styles.maxText}>MAX</Text>
                        </TouchableOpacity>
                    }
                />

                {selectedToken && amount && (
                    <View style={styles.fiatValue}>
                        <Text
                            style={[
                                styles.fiatText,
                                { color: theme.colors.textSecondary },
                            ]}
                        >
                            ≈ $
                            {(
                                parseFloat(amount) * (selectedToken.fiatValue / parseFloat(selectedToken.balance))
                            ).toFixed(2)}
                        </Text>
                    </View>
                )}

                {/* Transaction Details */}
                <Card
                    variant="outlined"
                    style={{
                        padding: theme.spacing.lg,
                        marginTop: theme.spacing.xl,
                        marginBottom: theme.spacing.lg,
                    }}
                >
                    <Text
                        style={[
                            styles.detailsTitle,
                            { color: theme.colors.text },
                        ]}
                    >
                        Transaction Details
                    </Text>

                    <View style={styles.detailRow}>
                        <Text
                            style={[
                                styles.detailLabel,
                                { color: theme.colors.textSecondary },
                            ]}
                        >
                            Network Fee
                        </Text>
                        <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                            ~$0.50
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text
                            style={[
                                styles.detailLabel,
                                { color: theme.colors.textSecondary },
                            ]}
                        >
                            Estimated Time
                        </Text>
                        <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                            ~30 seconds
                        </Text>
                    </View>

                    <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                        <Text
                            style={[
                                styles.detailLabel,
                                { color: theme.colors.textSecondary },
                            ]}
                        >
                            Total
                        </Text>
                        <Text
                            style={[
                                styles.detailValue,
                                { color: theme.colors.text, fontWeight: '600' },
                            ]}
                        >
                            {amount || '0'} {selectedToken?.symbol}
                        </Text>
                    </View>
                </Card>

                {/* Security Notice */}
                <View
                    style={[
                        styles.notice,
                        { backgroundColor: theme.colors.warning + '20' },
                    ]}
                >
                    <Ionicons name="shield-checkmark" size={20} color={theme.colors.warning} />
                    <Text
                        style={[
                            styles.noticeText,
                            { color: theme.colors.text },
                        ]}
                    >
                        Always verify the recipient address before sending
                    </Text>
                </View>

                {/* Send Button */}
                <Button
                    title="Send"
                    onPress={handleSend}
                    loading={isLoading}
                    disabled={!recipientAddress || !amount || isLoading}
                    fullWidth
                    size="large"
                    style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing.xxl }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 8,
    },
    walletInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    walletName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    walletAddress: {
        fontSize: 14,
    },
    walletBalance: {
        fontSize: 20,
        fontWeight: '600',
    },
    tokenGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    tokenSymbol: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    tokenBalance: {
        fontSize: 13,
    },
    maxButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    maxText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    fiatValue: {
        marginTop: 8,
    },
    fiatText: {
        fontSize: 14,
    },
    detailsTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    detailLabel: {
        fontSize: 15,
    },
    detailValue: {
        fontSize: 15,
    },
    notice: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        marginTop: 8,
    },
    noticeText: {
        fontSize: 13,
        marginLeft: 8,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
    },
});
