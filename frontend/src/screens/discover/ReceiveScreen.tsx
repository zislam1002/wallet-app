/**
 * Receive Screen - Display wallet address
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useWalletStore } from '../../store/walletStore';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import * as Clipboard from 'expo-clipboard';

export const ReceiveScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { wallets } = useWalletStore();
    const [selectedWallet, setSelectedWallet] = useState(wallets[0]);

    const handleCopy = async () => {
        if (selectedWallet) {
            await Clipboard.setStringAsync(selectedWallet.address);
            Alert.alert('Copied!', 'Address copied to clipboard');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    paddingTop: 60,
                    paddingHorizontal: theme.spacing.lg,
                    paddingBottom: theme.spacing.xl,
                    borderBottomLeftRadius: 32,
                    borderBottomRightRadius: 32,
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    shadowColor: theme.colors.primary,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                    elevation: 8,
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1.5,
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={{ color: '#FFFFFF', fontSize: theme.fontSize.xxl, fontWeight: theme.fontWeight.bold }}>
                        Receive
                    </Text>
                    <View style={{ width: 40 }} />
                </View>
            </LinearGradient>

            <View style={{ flex: 1, padding: theme.spacing.xl, justifyContent: 'center' }}>
                <Text style={{ fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold, color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.md }}>
                    Scan to Receive
                </Text>
                <Text style={{ fontSize: theme.fontSize.md, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: theme.spacing.xl }}>
                    {selectedWallet?.chainName || 'Ethereum'}
                </Text>

                {/* QR Code Placeholder */}
                <View style={{
                    backgroundColor: `${theme.colors.card}CC`,
                    borderRadius: theme.borderRadius.xl,
                    padding: theme.spacing.xl,
                    marginBottom: theme.spacing.xl,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    shadowColor: theme.colors.shadow,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.15,
                    shadowRadius: 20,
                    elevation: 8,
                }}>
                    <View style={{
                        width: 200,
                        height: 200,
                        backgroundColor: '#FFFFFF',
                        borderRadius: theme.borderRadius.lg,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: theme.spacing.lg,
                    }}>
                        <Ionicons name="qr-code" size={120} color={theme.colors.text} />
                    </View>

                    <Text style={{
                        fontSize: theme.fontSize.xs,
                        color: theme.colors.textSecondary,
                        textAlign: 'center',
                        marginBottom: theme.spacing.sm
                    }}>
                        Wallet Address
                    </Text>
                    <Text style={{
                        fontSize: theme.fontSize.sm,
                        color: theme.colors.text,
                        textAlign: 'center',
                        lineHeight: 20,
                        fontWeight: theme.fontWeight.medium,
                    }}>
                        {selectedWallet?.address}
                    </Text>
                </View>

                <Button
                    title="Copy Address"
                    onPress={handleCopy}
                    variant="primary"
                    fullWidth
                    icon={<Ionicons name="copy-outline" size={20} color="#FFFFFF" />}
                />
            </View>
        </View>
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
    headerTitle: {},
});
