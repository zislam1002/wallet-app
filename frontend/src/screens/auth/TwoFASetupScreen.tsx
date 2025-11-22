import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/ThemeProvider';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { AuthStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/authStore';

type TwoFASetupScreenProps = {
    navigation: NativeStackNavigationProp<AuthStackParamList, 'TwoFASetup'>;
    route?: { params?: { skipable?: boolean } };
}; export const TwoFASetupScreen: React.FC<TwoFASetupScreenProps> = ({ navigation, route }) => {
    const { theme } = useTheme();
    const { updateUser } = useAuthStore();

    const handleEnable2FA = () => {
        updateUser({ twoFAEnabled: true });
        // In a real app, would navigate to main app or back
        // For now, this will be handled by navigation structure
    };

    const handleSkip = () => {
        // Navigation will be handled by auth state
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.content, { padding: theme.spacing.lg }]}>
                <Text
                    style={[
                        styles.title,
                        {
                            fontSize: theme.fontSize.xxxl,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.md,
                            textAlign: 'center',
                        },
                    ]}
                >
                    Enable 2FA
                </Text>
                <Text
                    style={[
                        styles.subtitle,
                        {
                            fontSize: theme.fontSize.md,
                            color: theme.colors.textSecondary,
                            marginBottom: theme.spacing.xl,
                            textAlign: 'center',
                        },
                    ]}
                >
                    Add an extra layer of security to your wallet
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
                        🛡️ Enhanced Security
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
                        Two-factor authentication protects your account even if someone gets your password.
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
                        📱 Multiple Methods
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
                        Choose from SMS, authenticator apps, or biometric authentication.
                    </Text>
                </Card>

                <Button
                    title="Enable 2FA Now"
                    onPress={handleEnable2FA}
                    fullWidth
                    size="large"
                    style={{ marginBottom: theme.spacing.md }}
                />

                {route?.params?.skipable && (
                    <Button
                        title="Skip for Now"
                        onPress={handleSkip}
                        variant="ghost"
                        fullWidth
                        size="large"
                    />
                )}
            </View>
        </SafeAreaView>
    );
}; const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {},
    subtitle: {},
    cardTitle: {},
    cardText: {},
});
