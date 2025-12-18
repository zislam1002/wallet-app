/**
 * Swap Screen - Token exchange
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

export const SwapScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { wallets } = useWalletStore();
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [fromToken, setFromToken] = useState('ETH');
    const [toToken, setToToken] = useState('BTC');

    const handleSwap = () => {
        if (!fromAmount) {
            Alert.alert('Error', 'Please enter an amount');
            return;
        }
        Alert.alert('Success', `Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`);
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
                        Swap
                    </Text>
                    <View style={{ width: 40 }} />
                </View>
            </LinearGradient>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: theme.spacing.lg }}>
                {/* From */}
                <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text, marginBottom: theme.spacing.sm }}>
                    From
                </Text>
                <View style={{
                    marginBottom: theme.spacing.md,
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder="0.00"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={fromAmount}
                            onChangeText={setFromAmount}
                            keyboardType="numeric"
                            style={{ fontSize: theme.fontSize.xl, color: theme.colors.text, flex: 1 }}
                        />
                        <Text style={{ fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: theme.colors.text }}>
                            {fromToken}
                        </Text>
                    </View>
                </View>

                {/* Swap Icon */}
                <View style={{ alignItems: 'center', marginVertical: theme.spacing.md }}>
                    <LinearGradient
                        colors={[`${theme.colors.primary}E6`, `${theme.colors.secondary}E6`]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 24,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1.5,
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            shadowColor: theme.colors.primary,
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 10,
                            elevation: 6,
                        }}
                    >
                        <Ionicons name="swap-vertical" size={24} color="#FFFFFF" />
                    </LinearGradient>
                </View>

                {/* To */}
                <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text, marginBottom: theme.spacing.sm }}>
                    To
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder="0.00"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={toAmount}
                            onChangeText={setToAmount}
                            keyboardType="numeric"
                            style={{ fontSize: theme.fontSize.xl, color: theme.colors.text, flex: 1 }}
                        />
                        <Text style={{ fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: theme.colors.text }}>
                            {toToken}
                        </Text>
                    </View>
                </View>

                <Button
                    title="Swap"
                    onPress={handleSwap}
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
