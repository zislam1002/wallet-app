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
                        Send
                    </Text>
                    <View style={{ width: 40 }} />
                </View>
            </LinearGradient>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: theme.spacing.lg }}>
                {/* Recipient Address */}
                <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text, marginBottom: theme.spacing.sm }}>
                    Recipient Address
                </Text>
                <View style={{
                    marginBottom: theme.spacing.lg,
                    padding: theme.spacing.md,
                    backgroundColor: `${theme.colors.card}CC`,
                    borderRadius: theme.borderRadius.lg,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    shadowColor: theme.colors.shadow,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    elevation: 3,
                }}>
                    <TextInput
                        placeholder="0x..."
                        placeholderTextColor={theme.colors.textSecondary}
                        value={recipientAddress}
                        onChangeText={setRecipientAddress}
                        style={{ fontSize: theme.fontSize.md, color: theme.colors.text }}
                    />
                </View>

                {/* Amount */}
                <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text, marginBottom: theme.spacing.sm }}>
                    Amount
                </Text>
                <View style={{
                    marginBottom: theme.spacing.xl,
                    padding: theme.spacing.md,
                    backgroundColor: `${theme.colors.card}CC`,
                    borderRadius: theme.borderRadius.lg,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    shadowColor: theme.colors.shadow,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    elevation: 3,
                }}>
                    <TextInput
                        placeholder="0.00"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        style={{ fontSize: theme.fontSize.md, color: theme.colors.text }}
                    />
                </View>

                <Button
                    title="Send"
                    onPress={handleSend}
                    variant="primary"
                    fullWidth
                />
            </ScrollView>
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
