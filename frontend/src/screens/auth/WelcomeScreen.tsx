import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={[styles.content, { paddingHorizontal: theme.spacing.lg }]}>
                    {/* Hero Section with Gradient */}
                    <View style={[styles.header, { marginTop: theme.spacing.xl }]}>
                        <LinearGradient
                            colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[
                                styles.logoPlaceholder,
                                {
                                    borderRadius: 28,
                                    marginBottom: theme.spacing.lg,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.logoText,
                                    {
                                        fontSize: 48,
                                        fontWeight: theme.fontWeight.bold,
                                        color: '#FFFFFF',
                                    },
                                ]}
                            >
                                L
                            </Text>
                        </LinearGradient>
                        <Text
                            style={[
                                styles.title,
                                {
                                    fontSize: 36,
                                    fontWeight: theme.fontWeight.bold,
                                    color: theme.colors.text,
                                    marginBottom: theme.spacing.xs,
                                    letterSpacing: -0.5,
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
                            Your gateway to decentralized finance
                        </Text>
                    </View>

                    {/* Feature Highlights - Modern & Clean */}
                    <View style={[styles.features, { marginBottom: theme.spacing.lg }]}>
                        <View style={{ flexDirection: 'row', marginBottom: theme.spacing.md }}>
                            <LinearGradient
                                colors={[theme.colors.primary, theme.colors.primaryDark]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.featureIconGradient}
                            >
                                <Text style={{ fontSize: 24, color: '#fff' }}>🔒</Text>
                            </LinearGradient>
                            <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                                <Text
                                    style={{
                                        fontSize: theme.fontSize.md,
                                        fontWeight: theme.fontWeight.bold,
                                        color: theme.colors.text,
                                        marginBottom: 4,
                                    }}
                                >
                                    Bank-Grade Security
                                </Text>
                                <Text
                                    style={{
                                        fontSize: theme.fontSize.sm,
                                        color: theme.colors.textSecondary,
                                        lineHeight: 20,
                                    }}
                                >
                                    Your assets are protected with military-grade encryption
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: theme.spacing.md }}>
                            <LinearGradient
                                colors={[theme.colors.success, '#059669']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.featureIconGradient}
                            >
                                <Text style={{ fontSize: 24, color: '#fff' }}>⚡</Text>
                            </LinearGradient>
                            <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                                <Text
                                    style={{
                                        fontSize: theme.fontSize.md,
                                        fontWeight: theme.fontWeight.bold,
                                        color: theme.colors.text,
                                        marginBottom: 4,
                                    }}
                                >
                                    Lightning Fast
                                </Text>
                                <Text
                                    style={{
                                        fontSize: theme.fontSize.sm,
                                        color: theme.colors.textSecondary,
                                        lineHeight: 20,
                                    }}
                                >
                                    Send and receive crypto in seconds, not hours
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: theme.spacing.md }}>
                            <LinearGradient
                                colors={[theme.colors.secondary, '#BE185D']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.featureIconGradient}
                            >
                                <Text style={{ fontSize: 24, color: '#fff' }}>🌍</Text>
                            </LinearGradient>
                            <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                                <Text
                                    style={{
                                        fontSize: theme.fontSize.md,
                                        fontWeight: theme.fontWeight.bold,
                                        color: theme.colors.text,
                                        marginBottom: 4,
                                    }}
                                >
                                    Multi-Chain Support
                                </Text>
                                <Text
                                    style={{
                                        fontSize: theme.fontSize.sm,
                                        color: theme.colors.textSecondary,
                                        lineHeight: 20,
                                    }}
                                >
                                    Access Ethereum, Bitcoin, Polygon, and more
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Auth Buttons - Modern Design */}
                    <View style={[styles.authButtons, { marginBottom: theme.spacing.md }]}>
                        <View style={{ marginBottom: theme.spacing.md }}>
                            <LinearGradient
                                colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    borderRadius: theme.borderRadius.md,
                                }}
                            >
                                <Button
                                    title="Get Started"
                                    onPress={() => handleSocialLogin('email')}
                                    variant="primary"
                                    fullWidth
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderWidth: 0,
                                    }}
                                    textStyle={{
                                        fontWeight: '700',
                                        color: '#FFFFFF'
                                    }}
                                />
                            </LinearGradient>
                        </View>

                        <Button
                            title="Continue with Google"
                            onPress={() => handleSocialLogin('google')}
                            variant="outline"
                            fullWidth
                            style={{
                                marginBottom: theme.spacing.sm,
                                borderColor: theme.colors.border,
                            }}
                        />
                        <Button
                            title="Continue with Apple"
                            onPress={() => handleSocialLogin('apple')}
                            variant="outline"
                            fullWidth
                            style={{
                                marginBottom: theme.spacing.md,
                                borderColor: theme.colors.border,
                            }}
                        />
                    </View>

                    {/* Create Wallet CTA */}
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.textSecondary }}>
                            Already have a wallet?{' '}
                            <Text
                                style={{ color: theme.colors.primary, fontWeight: theme.fontWeight.semibold }}
                                onPress={() => navigation.navigate('CreateWallet')}
                            >
                                Import
                            </Text>
                        </Text>
                    </View>
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
    featureIconGradient: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    authButtons: {},
});
