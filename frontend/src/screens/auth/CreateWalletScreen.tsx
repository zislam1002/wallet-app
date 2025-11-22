import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { AuthStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../api/client';

type CreateWalletScreenProps = {
    navigation: NativeStackNavigationProp<AuthStackParamList, 'CreateWallet'>;
};

export const CreateWalletScreen: React.FC<CreateWalletScreenProps> = ({ navigation }) => {
    const { theme } = useTheme();
    const { setUser } = useAuthStore();
    const [loading, setLoading] = useState(false);

    const handleCreateWallet = async () => {
        setLoading(true);
        try {
            // Mock wallet creation - generates fake seed phrase in background
            const response = await api.socialLogin('email', {
                email: `user${Date.now()}@lykos.wallet`,
                password: 'mock_password',
                newWallet: true,
            });

            await setUser(response.user, response.token);
            api.setToken(response.token);

            // Navigate to 2FA setup
            navigation.navigate('TwoFASetup', { skipable: true });
        } catch (err) {
            console.error('Wallet creation failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Back Button */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.content, { padding: theme.spacing.lg }]}>
                    <Text
                        style={[
                            styles.title,
                            {
                                fontSize: theme.fontSize.xxxl,
                                fontWeight: theme.fontWeight.bold,
                                color: theme.colors.text,
                                marginBottom: theme.spacing.md,
                            },
                        ]}
                    >
                        Create Wallet
                    </Text>
                    <Text
                        style={[
                            styles.subtitle,
                            {
                                fontSize: theme.fontSize.md,
                                color: theme.colors.textSecondary,
                                marginBottom: theme.spacing.xl,
                            },
                        ]}
                    >
                        Your wallet is secured with industry-leading encryption
                    </Text>

                    <Card variant="elevated" style={{ marginBottom: theme.spacing.md }}>
                        <Text
                            style={[
                                styles.cardTitle,
                                {
                                    fontSize: theme.fontSize.lg,
                                    fontWeight: theme.fontWeight.semibold,
                                    color: theme.colors.text,
                                    marginBottom: theme.spacing.sm,
                                },
                            ]}
                        >
                            🔐 Secure by Default
                        </Text>
                        <Text
                            style={[
                                styles.cardText,
                                {
                                    fontSize: theme.fontSize.sm,
                                    color: theme.colors.textSecondary,
                                    lineHeight: 20,
                                },
                            ]}
                        >
                            Your recovery phrase is generated securely on your device. We never have access to
                            your private keys.
                        </Text>
                    </Card>

                    <Card variant="elevated" style={{ marginBottom: theme.spacing.md }}>
                        <Text
                            style={[
                                styles.cardTitle,
                                {
                                    fontSize: theme.fontSize.lg,
                                    fontWeight: theme.fontWeight.semibold,
                                    color: theme.colors.text,
                                    marginBottom: theme.spacing.sm,
                                },
                            ]}
                        >
                            💾 Automatic Backup
                        </Text>
                        <Text
                            style={[
                                styles.cardText,
                                {
                                    fontSize: theme.fontSize.sm,
                                    color: theme.colors.textSecondary,
                                    lineHeight: 20,
                                },
                            ]}
                        >
                            Enable cloud backup to restore your wallet on any device. Your backup is encrypted
                            with your password.
                        </Text>
                    </Card>

                    <Card variant="elevated" style={{ marginBottom: theme.spacing.xl }}>
                        <Text
                            style={[
                                styles.cardTitle,
                                {
                                    fontSize: theme.fontSize.lg,
                                    fontWeight: theme.fontWeight.semibold,
                                    color: theme.colors.text,
                                    marginBottom: theme.spacing.sm,
                                },
                            ]}
                        >
                            🎯 Simple & Powerful
                        </Text>
                        <Text
                            style={[
                                styles.cardText,
                                {
                                    fontSize: theme.fontSize.sm,
                                    color: theme.colors.textSecondary,
                                    lineHeight: 20,
                                },
                            ]}
                        >
                            Start with a simple interface, toggle Pro Mode when you need advanced features like
                            manual gas control and detailed transaction data.
                        </Text>
                    </Card>

                    <Button
                        title="Create Wallet (Recommended)"
                        onPress={handleCreateWallet}
                        loading={loading}
                        fullWidth
                        size="large"
                        style={{ marginBottom: theme.spacing.md }}
                    />

                    <Button
                        title="Import Existing Wallet"
                        onPress={() => {
                            // Mock import - would show seed phrase input in real app
                            alert('Import wallet feature coming soon');
                        }}
                        variant="outline"
                        fullWidth
                        size="large"
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
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
    },
    cardTitle: {},
    cardText: {},
});
