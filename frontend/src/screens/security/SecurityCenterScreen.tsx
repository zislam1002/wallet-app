/**
 * Security Center Screen - Manage security settings and 2FA
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Switch,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Tag } from '../../components/Tag';

export const SecurityCenterScreen = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const { user } = useAuthStore();

    const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFAEnabled || false);
    const [biometricsEnabled, setBiometricsEnabled] = useState(false);
    const [autoLockEnabled, setAutoLockEnabled] = useState(true);
    const [transactionConfirmation, setTransactionConfirmation] = useState(true);

    const handleToggle2FA = () => {
        if (twoFactorEnabled) {
            Alert.alert(
                'Disable 2FA',
                'Are you sure you want to disable two-factor authentication?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Disable',
                        style: 'destructive',
                        onPress: () => setTwoFactorEnabled(false),
                    },
                ]
            );
        } else {
            navigation.navigate('TwoFASetup' as never);
        }
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
                    Security Center
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Security Status */}
                <LinearGradient
                    colors={[theme.colors.success, '#059669']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        margin: theme.spacing.lg,
                        padding: theme.spacing.xl,
                        borderRadius: theme.borderRadius.lg,
                        shadowColor: theme.colors.success,
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.3,
                        shadowRadius: 16,
                        elevation: 12,
                    }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <View
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 32,
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: theme.spacing.md,
                            }}
                        >
                            <Ionicons name="shield-checkmark" size={32} color="#fff" />
                        </View>
                        <Text
                            style={{
                                fontSize: theme.fontSize.xl,
                                fontWeight: theme.fontWeight.bold,
                                color: '#FFFFFF',
                                marginBottom: theme.spacing.xs,
                            }}
                        >
                            Your Account is Secure
                        </Text>
                        <Text
                            style={{
                                fontSize: theme.fontSize.sm,
                                color: 'rgba(255,255,255,0.9)',
                                textAlign: 'center',
                            }}
                        >
                            {twoFactorEnabled ? '2FA enabled' : 'Enable 2FA for extra protection'}
                        </Text>
                    </View>
                </LinearGradient>

                {/* Authentication */}
                <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.md,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        Authentication
                    </Text>

                    <Card variant="elevated" style={{ marginBottom: theme.spacing.md }}>
                        <View style={{ padding: theme.spacing.lg }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
                                <LinearGradient
                                    colors={[theme.colors.primary, theme.colors.primaryDark]}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: theme.spacing.md,
                                    }}
                                >
                                    <Ionicons name="key" size={20} color="#fff" />
                                </LinearGradient>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                        <Text
                                            style={{
                                                fontSize: theme.fontSize.md,
                                                fontWeight: theme.fontWeight.bold,
                                                color: theme.colors.text,
                                                marginRight: theme.spacing.xs,
                                            }}
                                        >
                                            Two-Factor Authentication
                                        </Text>
                                        {twoFactorEnabled && (
                                            <Tag label="Active" variant="success" />
                                        )}
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.sm,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        Add an extra layer of security
                                    </Text>
                                </View>
                                <Switch
                                    value={twoFactorEnabled}
                                    onValueChange={handleToggle2FA}
                                    trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                                />
                            </View>
                        </View>
                    </Card>

                    <Card variant="elevated" style={{ marginBottom: theme.spacing.md }}>
                        <View style={{ padding: theme.spacing.lg }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                                    <Ionicons name="finger-print" size={24} color={theme.colors.primary} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.md,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                            marginBottom: 4,
                                        }}
                                    >
                                        Biometric Authentication
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.sm,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        Use fingerprint or Face ID
                                    </Text>
                                </View>
                                <Switch
                                    value={biometricsEnabled}
                                    onValueChange={setBiometricsEnabled}
                                    trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                                />
                            </View>
                        </View>
                    </Card>
                </View>

                {/* App Security */}
                <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.md,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        App Security
                    </Text>

                    <Card variant="elevated" style={{ marginBottom: theme.spacing.md }}>
                        <View style={{ padding: theme.spacing.lg }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: `${theme.colors.warning}20`,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: theme.spacing.md,
                                    }}
                                >
                                    <Ionicons name="lock-closed" size={20} color={theme.colors.warning} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.md,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                            marginBottom: 4,
                                        }}
                                    >
                                        Auto-Lock
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.sm,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        Lock app after 5 minutes
                                    </Text>
                                </View>
                                <Switch
                                    value={autoLockEnabled}
                                    onValueChange={setAutoLockEnabled}
                                    trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                                />
                            </View>
                        </View>
                    </Card>

                    <Card variant="elevated" style={{ marginBottom: theme.spacing.md }}>
                        <View style={{ padding: theme.spacing.lg }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                                    <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.md,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                            marginBottom: 4,
                                        }}
                                    >
                                        Transaction Confirmation
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.sm,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        Review before sending
                                    </Text>
                                </View>
                                <Switch
                                    value={transactionConfirmation}
                                    onValueChange={setTransactionConfirmation}
                                    trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                                />
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Recovery & Backup */}
                <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.md,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        Recovery & Backup
                    </Text>

                    <Card variant="elevated" style={{ marginBottom: theme.spacing.md }}>
                        <TouchableOpacity
                            style={{ padding: theme.spacing.lg }}
                            onPress={() => Alert.alert('Coming Soon', 'Seed phrase backup')}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: `${theme.colors.error}20`,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: theme.spacing.md,
                                    }}
                                >
                                    <Ionicons name="document-text" size={20} color={theme.colors.error} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.md,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                            marginBottom: 4,
                                        }}
                                    >
                                        Backup Seed Phrase
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.sm,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        Save your recovery phrase
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                            </View>
                        </TouchableOpacity>
                    </Card>

                    <Card variant="elevated" style={{ marginBottom: theme.spacing.md }}>
                        <TouchableOpacity
                            style={{ padding: theme.spacing.lg }}
                            onPress={() => Alert.alert('Coming Soon', 'Connected devices management')}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                                    <Ionicons name="phone-portrait" size={20} color={theme.colors.primary} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.md,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                            marginBottom: 4,
                                        }}
                                    >
                                        Connected Devices
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.sm,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        Manage authorized devices
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                            </View>
                        </TouchableOpacity>
                    </Card>
                </View>

                {/* Danger Zone */}
                <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.xl }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.md,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.colors.error,
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        Danger Zone
                    </Text>

                    <Button
                        title="Change Password"
                        onPress={() => Alert.alert('Coming Soon', 'Password change functionality')}
                        variant="outline"
                        fullWidth
                        style={{ marginBottom: theme.spacing.sm, borderColor: theme.colors.error }}
                        textStyle={{ color: theme.colors.error }}
                    />
                    <Button
                        title="Reset Wallet"
                        onPress={() =>
                            Alert.alert(
                                'Reset Wallet',
                                'This will remove all wallets from this device. Make sure you have backed up your seed phrase!',
                                [
                                    { text: 'Cancel', style: 'cancel' },
                                    { text: 'Reset', style: 'destructive' },
                                ]
                            )
                        }
                        variant="outline"
                        fullWidth
                        style={{ borderColor: theme.colors.error }}
                        textStyle={{ color: theme.colors.error }}
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
