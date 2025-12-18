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
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.colors.border, padding: theme.spacing.lg }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.colors.text, fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold }]}>
                    Receive
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: 'center' }}>
                <Text style={{ fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.xl }}>
                    Your Wallet Address
                </Text>

                <Card variant="elevated" style={{ padding: theme.spacing.xl, marginBottom: theme.spacing.xl }}>
                    <Text style={{ fontSize: theme.fontSize.md, color: theme.colors.text, textAlign: 'center', lineHeight: 24 }}>
                        {selectedWallet?.address}
                    </Text>
                </Card>

                <Button
                    title="Copy Address"
                    onPress={handleCopy}
                    variant="primary"
                    fullWidth
                />
            </View>
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
    headerTitle: {},
});
