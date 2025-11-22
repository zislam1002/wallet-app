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
import { Input } from '../../components/Input';
import { AuthStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../api/client';

type SignInScreenProps = {
    navigation: NativeStackNavigationProp<AuthStackParamList, 'SignIn'>;
    route: { params?: { provider?: string } };
};

export const SignInScreen: React.FC<SignInScreenProps> = ({ navigation, route }) => {
    const { theme } = useTheme();
    const { setUser } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.socialLogin('email', { email, password });
            await setUser(response.user, response.token);
            api.setToken(response.token);
            // Navigation will be handled by the auth state change
        } catch (err: any) {
            setError(err.message || 'Sign in failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'apple') => {
        setLoading(true);
        try {
            const response = await api.socialLogin(provider);
            await setUser(response.user, response.token);
            api.setToken(response.token);
        } catch (err: any) {
            setError(err.message || 'Sign in failed');
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
                                marginBottom: theme.spacing.sm,
                            },
                        ]}
                    >
                        Welcome Back
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
                        Sign in to your Lykos Wallet
                    </Text>

                    {error && (
                        <View
                            style={[
                                styles.errorContainer,
                                {
                                    backgroundColor: `${theme.colors.error}20`,
                                    padding: theme.spacing.md,
                                    borderRadius: theme.borderRadius.md,
                                    marginBottom: theme.spacing.lg,
                                },
                            ]}
                        >
                            <Text style={{ color: theme.colors.error, fontSize: theme.fontSize.sm }}>
                                {error}
                            </Text>
                        </View>
                    )}

                    <Input
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="your@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        containerStyle={{ marginBottom: theme.spacing.md }}
                    />

                    <Input
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        secureTextEntry
                        containerStyle={{ marginBottom: theme.spacing.lg }}
                    />

                    <Button
                        title="Sign In"
                        onPress={handleSignIn}
                        loading={loading}
                        fullWidth
                        style={{ marginBottom: theme.spacing.lg }}
                    />

                    <View style={[styles.divider, { marginBottom: theme.spacing.lg }]}>
                        <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
                        <Text style={[styles.dividerText, { color: theme.colors.textSecondary }]}>
                            OR
                        </Text>
                        <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
                    </View>

                    <Button
                        title="Continue with Google"
                        onPress={() => handleSocialLogin('google')}
                        variant="outline"
                        fullWidth
                        style={{ marginBottom: theme.spacing.md }}
                        disabled={loading}
                    />

                    <Button
                        title="Continue with Apple"
                        onPress={() => handleSocialLogin('apple')}
                        variant="outline"
                        fullWidth
                        style={{ marginBottom: theme.spacing.xl }}
                        disabled={loading}
                    />

                    <TouchableOpacity
                        onPress={() => navigation.navigate('CreateWallet')}
                        style={styles.createAccount}
                    >
                        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.fontSize.sm }}>
                            Don't have a wallet?{' '}
                            <Text style={{ color: theme.colors.primary, fontWeight: theme.fontWeight.semibold }}>
                                Create one
                            </Text>
                        </Text>
                    </TouchableOpacity>
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
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
    },
    errorContainer: {},
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dividerLine: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        marginHorizontal: 16,
    },
    createAccount: {
        alignItems: 'center',
    },
});
