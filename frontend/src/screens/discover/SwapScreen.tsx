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
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.colors.border, padding: theme.spacing.lg }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.colors.text, fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold }]}>
                    Swap
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: theme.spacing.lg }}>
                {/* From */}
                <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text, marginBottom: theme.spacing.sm }}>
                    From
                </Text>
                <Card variant="outlined" style={{ marginBottom: theme.spacing.md, padding: theme.spacing.md }}>
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
                </Card>

                {/* Swap Icon */}
                <View style={{ alignItems: 'center', marginVertical: theme.spacing.md }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: theme.colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Ionicons name="swap-vertical" size={24} color="#FFFFFF" />
                    </View>
                </View>

                {/* To */}
                <Text style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text, marginBottom: theme.spacing.sm }}>
                    To
                </Text>
                <Card variant="outlined" style={{ marginBottom: theme.spacing.xl, padding: theme.spacing.md }}>
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
                </Card>

                <Button
                    title="Swap"
                    onPress={handleSwap}
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
