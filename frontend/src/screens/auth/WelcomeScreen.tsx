import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { AuthStackParamList } from '../../navigation/types';

type WelcomeScreenProps = {
    navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    const { theme } = useTheme();

    const handleSocialLogin = (provider: 'google' | 'apple' | 'email') => {
        // Mock social login - navigate directly to main app
        navigation.navigate('SignIn', { provider });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.content, { paddingHorizontal: theme.spacing.lg }]}>
                    {/* Logo and Branding */}
                    <View style={[styles.header, { marginTop: theme.spacing.xxl }]}>
                        <View
                            style={[
                                styles.logoPlaceholder,
                                {
                                    backgroundColor: theme.colors.primary,
                                    borderRadius: theme.borderRadius.xl,
                                    marginBottom: theme.spacing.lg,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.logoText,
                                    {
                                        fontSize: theme.fontSize.xxxl,
                                        fontWeight: theme.fontWeight.bold,
                                        color: '#FFFFFF',
                                    },
                                ]}
                            >
                                L
                            </Text>
                        </View>
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
                            Lykos Wallet
                        </Text>
                        <Text
                            style={[
                                styles.tagline,
                                {
                                    fontSize: theme.fontSize.lg,
                                    color: theme.colors.textSecondary,
                                    marginBottom: theme.spacing.xl,
                                },
                            ]}
                        >
                            Web3 for Everyone
                        </Text>
                    </View>

                    {/* Feature Highlights */}
                    <View style={[styles.features, { marginBottom: theme.spacing.xl }]}>
                        <Card style={{ marginBottom: theme.spacing.md }} variant="elevated">
                            <Text
                                style={[
                                    styles.featureTitle,
                                    {
                                        fontSize: theme.fontSize.md,
                                        fontWeight: theme.fontWeight.semibold,
                                        color: theme.colors.text,
                                        marginBottom: theme.spacing.xs,
                                    },
                                ]}
                            >
                                🔒 Secure & Simple
                            </Text>
                            <Text
                                style={[
                                    styles.featureText,
                                    { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary },
                                ]}
                            >
                                Bank-level security with beginner-friendly design
                            </Text>
                        </Card>

                        <Card style={{ marginBottom: theme.spacing.md }} variant="elevated">
                            <Text
                                style={[
                                    styles.featureTitle,
                                    {
                                        fontSize: theme.fontSize.md,
                                        fontWeight: theme.fontWeight.semibold,
                                        color: theme.colors.text,
                                        marginBottom: theme.spacing.xs,
                                    },
                                ]}
                            >
                                🌐 Multi-Chain Support
                            </Text>
                            <Text
                                style={[
                                    styles.featureText,
                                    { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary },
                                ]}
                            >
                                Manage all your crypto in one beautiful app
                            </Text>
                        </Card>

                        <Card variant="elevated">
                            <Text
                                style={[
                                    styles.featureTitle,
                                    {
                                        fontSize: theme.fontSize.md,
                                        fontWeight: theme.fontWeight.semibold,
                                        color: theme.colors.text,
                                        marginBottom: theme.spacing.xs,
                                    },
                                ]}
                            >
                                🎁 Earn Rewards
                            </Text>
                            <Text
                                style={[
                                    styles.featureText,
                                    { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary },
                                ]}
                            >
                                Get EXP tokens for every transaction
                            </Text>
                        </Card>
                    </View>

                    {/* Auth Buttons */}
                    <View style={[styles.authButtons, { marginBottom: theme.spacing.lg }]}>
                        <Button
                            title="Continue with Google"
                            onPress={() => handleSocialLogin('google')}
                            variant="outline"
                            fullWidth
                            style={{ marginBottom: theme.spacing.md }}
                        />
                        <Button
                            title="Continue with Apple"
                            onPress={() => handleSocialLogin('apple')}
                            variant="outline"
                            fullWidth
                            style={{ marginBottom: theme.spacing.md }}
                        />
                        <Button
                            title="Continue with Email"
                            onPress={() => handleSocialLogin('email')}
                            variant="primary"
                            fullWidth
                        />
                    </View>

                    {/* Create Wallet CTA */}
                    <Button
                        title="Create New Wallet"
                        onPress={() => navigation.navigate('CreateWallet')}
                        variant="ghost"
                        fullWidth
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
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
    },
    logoPlaceholder: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
    },
    tagline: {
        textAlign: 'center',
    },
    features: {},
    featureTitle: {},
    featureText: {},
    authButtons: {},
});
