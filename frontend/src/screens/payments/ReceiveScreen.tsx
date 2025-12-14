/**
 * Receive Screen - Display wallet address and QR code
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Share,
    Alert,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useWalletStore } from '../../store/walletStore';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import * as Clipboard from 'expo-clipboard';

export const ReceiveScreen = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const { wallets } = useWalletStore();

    const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
    const [showHelp, setShowHelp] = useState(true);

    const handleCopy = async () => {
        if (selectedWallet) {
            await Clipboard.setStringAsync(selectedWallet.address);
            Alert.alert('Copied!', 'Address copied to clipboard');
        }
    };

    const handleShare = async () => {
        if (selectedWallet) {
            try {
                await Share.share({
                    message: `Send ${selectedWallet.chainName} to: ${selectedWallet.address}`,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
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
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Receive</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Explanation Card with Gradient */}
                <LinearGradient
                    colors={[`${theme.colors.success}15`, `${theme.colors.gradientMiddle}15`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        padding: theme.spacing.lg,
                        marginBottom: theme.spacing.xl,
                        borderRadius: theme.borderRadius.lg,
                        borderWidth: 1,
                        borderColor: `${theme.colors.success}30`,
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <LinearGradient
                            colors={[theme.colors.success, theme.colors.gradientMiddle]}
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
                            <Text style={{ fontSize: 20 }}>📥</Text>
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
                                How to Receive Crypto
                            </Text>
                            <Text
                                style={{
                                    fontSize: theme.fontSize.sm,
                                    color: theme.colors.textSecondary,
                                    lineHeight: 20,
                                }}
                            >
                                1. Choose which type of crypto you want to receive{`\n`}
                                2. Share your wallet address with the sender{`\n`}
                                3. Wait for them to send - you'll see it appear automatically!
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Step 1 */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
                    <LinearGradient
                        colors={[theme.colors.success, theme.colors.gradientMiddle]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: theme.spacing.sm,
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>1</Text>
                    </LinearGradient>
                    <Text style={[styles.label, { color: theme.colors.text, fontWeight: theme.fontWeight.bold }]}>
                        Select Which Crypto to Receive
                    </Text>
                </View>
                <Text style={{ fontSize: theme.fontSize.xs, color: theme.colors.textSecondary, marginBottom: theme.spacing.sm }}>
                    Make sure the sender is sending the same type of crypto!
                </Text>
                <View style={styles.walletList}>
                    {wallets.map((wallet) => (
                        <TouchableOpacity
                            key={wallet.id}
                            onPress={() => setSelectedWallet(wallet)}
                        >
                            <Card
                                variant={
                                    selectedWallet.id === wallet.id ? 'elevated' : 'outlined'
                                }
                                style={{
                                    padding: theme.spacing.lg,
                                    marginBottom: theme.spacing.sm,
                                    borderColor:
                                        selectedWallet.id === wallet.id
                                            ? theme.colors.primary
                                            : theme.colors.border,
                                    borderWidth: selectedWallet.id === wallet.id ? 2 : 1,
                                }}
                            >
                                <View style={styles.walletRow}>
                                    <View
                                        style={[
                                            styles.walletIcon,
                                            {
                                                backgroundColor:
                                                    wallet.color || theme.colors.primary,
                                            },
                                        ]}
                                    >
                                        <Text style={styles.walletIconText}>
                                            {wallet.chainName.charAt(0)}
                                        </Text>
                                    </View>
                                    <View style={styles.walletInfo}>
                                        <Text
                                            style={[
                                                styles.walletName,
                                                {
                                                    color:
                                                        selectedWallet.id === wallet.id
                                                            ? theme.colors.primary
                                                            : theme.colors.text,
                                                },
                                            ]}
                                        >
                                            {wallet.chainName}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.walletBalance,
                                                { color: theme.colors.textSecondary },
                                            ]}
                                        >
                                            ${wallet.balanceFiat.toFixed(2)}
                                        </Text>
                                    </View>
                                    {selectedWallet.id === wallet.id && (
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={24}
                                            color={theme.colors.primary}
                                        />
                                    )}
                                </View>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Step 2 - QR Code */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing.xl, marginBottom: theme.spacing.md }}>
                    <LinearGradient
                        colors={[theme.colors.success, theme.colors.gradientMiddle]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: theme.spacing.sm,
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>2</Text>
                    </LinearGradient>
                    <Text style={[styles.label, { color: theme.colors.text, fontWeight: theme.fontWeight.bold }]}>
                        Share This QR Code
                    </Text>
                </View>
                <Text style={{ fontSize: theme.fontSize.xs, color: theme.colors.textSecondary, marginBottom: theme.spacing.md }}>
                    The sender can scan this with their camera to get your address automatically
                </Text>
                <Card
                    variant="elevated"
                    style={{
                        padding: theme.spacing.xxl,
                        alignItems: 'center' as 'center',
                        marginBottom: theme.spacing.lg,
                    }}
                >
                    <View
                        style={[
                            styles.qrPlaceholder,
                            { backgroundColor: theme.colors.background },
                        ]}
                    >
                        <Ionicons
                            name="qr-code"
                            size={120}
                            color={theme.colors.textSecondary}
                        />
                    </View>
                    <Text
                        style={[
                            styles.qrLabel,
                            { color: theme.colors.textSecondary },
                        ]}
                    >
                        Scan to send {selectedWallet?.chainName}
                    </Text>
                </Card>

                {/* Step 3 - Address */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing.md, marginBottom: theme.spacing.md }}>
                    <LinearGradient
                        colors={[theme.colors.success, theme.colors.gradientMiddle]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: theme.spacing.sm,
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>3</Text>
                    </LinearGradient>
                    <Text style={[styles.label, { color: theme.colors.text, fontWeight: theme.fontWeight.bold }]}>
                        Or Share This Address
                    </Text>
                </View>
                <Text style={{ fontSize: theme.fontSize.xs, color: theme.colors.textSecondary, marginBottom: theme.spacing.sm }}>
                    This is your unique {selectedWallet?.chainName} wallet address - like your email for crypto
                </Text>
                <Card
                    variant="outlined"
                    style={{
                        padding: theme.spacing.lg,
                        marginBottom: theme.spacing.lg,
                    }}
                >
                    <Text
                        style={[
                            styles.address,
                            { color: theme.colors.text },
                        ]}
                        selectable
                    >
                        {selectedWallet?.address}
                    </Text>
                </Card>

                {/* Action Buttons */}
                <View style={styles.buttonRow}>
                    <Button
                        title="Copy Address"
                        onPress={handleCopy}
                        variant="outline"
                        style={{ flex: 1, marginRight: 8 }}
                    />
                    <Button
                        title="Share"
                        onPress={handleShare}
                        variant="outline"
                        style={{ flex: 1, marginLeft: 8 }}
                    />
                </View>

                {/* Warning */}
                <View
                    style={[
                        styles.warning,
                        { backgroundColor: theme.colors.warning + '20' },
                    ]}
                >
                    <Ionicons name="warning" size={20} color={theme.colors.warning} />
                    <Text
                        style={[
                            styles.warningText,
                            { color: theme.colors.text },
                        ]}
                    >
                        Only send {selectedWallet?.chainName} to this address. Sending other
                        tokens may result in loss of funds.
                    </Text>
                </View>
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
        paddingBottom: 32,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 12,
    },
    walletList: {
        marginBottom: 8,
    },
    walletRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        marginRight: 12,
    },
    walletIconText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    walletInfo: {
        flex: 1,
    },
    walletName: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 4,
    },
    walletBalance: {
        fontSize: 14,
    },
    qrPlaceholder: {
        width: 200,
        height: 200,
        borderRadius: 16,
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        marginBottom: 16,
    },
    qrLabel: {
        fontSize: 14,
    },
    address: {
        fontSize: 15,
        fontFamily: 'monospace',
        lineHeight: 22,
    },
    buttonRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    warning: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 12,
        marginTop: 8,
    },
    warningText: {
        fontSize: 13,
        marginLeft: 8,
        flex: 1,
        lineHeight: 18,
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
