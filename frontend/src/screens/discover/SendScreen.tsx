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
    TextInput,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useWalletStore } from '../../store/walletStore';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

export const SendScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { wallets } = useWalletStore();
    const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleSend = () => {
        if (!recipientAddress || !amount) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        Alert.alert('Success', `Sent ${amount} to ${recipientAddress.substring(0, 10)}...`);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.colors.border, padding: theme.spacing.lg }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.colors.text, fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold }]}>
                    Send
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: theme.spacing.lg }}>
                {/* Recipient Address */}
                <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text, marginBottom: theme.spacing.sm }}>
                    Recipient Address
                </Text>
                <Card variant="outlined" style={{ marginBottom: theme.spacing.lg, padding: theme.spacing.md }}>
                    <TextInput
                        placeholder="0x..."
                        placeholderTextColor={theme.colors.textSecondary}
                        value={recipientAddress}
                        onChangeText={setRecipientAddress}
                        style={{ fontSize: theme.fontSize.md, color: theme.colors.text }}
                    />
                </Card>

                {/* Amount */}
                <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text, marginBottom: theme.spacing.sm }}>
                    Amount
                </Text>
                <Card variant="outlined" style={{ marginBottom: theme.spacing.xl, padding: theme.spacing.md }}>
                    <TextInput
                        placeholder="0.00"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        style={{ fontSize: theme.fontSize.md, color: theme.colors.text }}
                    />
                </Card>

                <Button
                    title="Send"
                    onPress={handleSend}
                    variant="primary"
                    fullWidth
                />
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
    headerTitle: {},
});
