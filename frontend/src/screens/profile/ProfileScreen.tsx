/**
 * Profile Screen - User profile and account management
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../store/authStore';
import { useWalletStore } from '../../store/walletStore';
import { useSettingsStore } from '../../store/settingsStore';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

export const ProfileScreen = () => {
    const { theme, setTheme } = useTheme();
    const navigation = useNavigation();
    const { user, logout } = useAuthStore();
    const { wallets } = useWalletStore();
    const { themeMode, setThemeMode } = useSettingsStore();

    const getThemeLabel = () => {
        if (themeMode === 'system') return 'Auto';
        if (themeMode === 'dark') return 'Dark';
        if (themeMode === 'light') return 'Light';
        return 'Auto';
    };

    const handleAppearancePress = () => {
        Alert.alert(
            'Appearance',
            'Choose your preferred theme',
            [
                {
                    text: 'Light',
                    onPress: async () => {
                        await setThemeMode('light');
                        setTheme('light');
                    },
                },
                {
                    text: 'Dark',
                    onPress: async () => {
                        await setThemeMode('dark');
                        setTheme('dark');
                    },
                },
                {
                    text: 'Auto',
                    onPress: async () => {
                        await setThemeMode('system');
                        setTheme('auto');
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    const handleSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: () => {
                        logout();
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const MenuItem = ({
        icon,
        label,
        value,
        onPress,
        showChevron = true,
        color,
    }: {
        icon: keyof typeof Ionicons.glyphMap;
        label: string;
        value?: string;
        onPress?: () => void;
        showChevron?: boolean;
        color?: string;
    }) => (
        <TouchableOpacity
            style={[
                styles.menuItem,
                {
                    backgroundColor: theme.colors.card,
                    borderBottomColor: theme.colors.border,
                },
            ]}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.menuLeft}>
                <View
                    style={[
                        styles.iconContainer,
                        {
                            backgroundColor: color
                                ? `${color}15`
                                : 'rgba(99, 102, 241, 0.15)',
                            borderWidth: 1,
                            borderColor: color
                                ? `${color}30`
                                : 'rgba(99, 102, 241, 0.3)',
                            shadowColor: color || theme.colors.primary,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.15,
                            shadowRadius: 6,
                            elevation: 2,
                        },
                    ]}
                >
                    <Ionicons
                        name={icon}
                        size={20}
                        color={color || theme.colors.primary}
                    />
                </View>
                <Text style={[styles.menuLabel, { color: theme.colors.text }]}>
                    {label}
                </Text>
            </View>
            <View style={styles.menuRight}>
                {value && (
                    <Text
                        style={[
                            styles.menuValue,
                            { color: theme.colors.textSecondary },
                        ]}
                    >
                        {value}
                    </Text>
                )}
                {showChevron && (
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={theme.colors.textSecondary}
                    />
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* User Info Card */}
                <Card
                    variant="elevated"
                    style={{
                        padding: theme.spacing.xl,
                        marginBottom: theme.spacing.lg,
                    }}
                >
                    <View style={styles.userInfo}>
                        <LinearGradient
                            colors={[`${theme.colors.gradientStart}E6`, `${theme.colors.gradientMiddle}E6`, `${theme.colors.gradientEnd}E6`]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[styles.avatar, {
                                borderWidth: 2,
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                shadowColor: theme.colors.primary,
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.25,
                                shadowRadius: 10,
                                elevation: 6,
                            }]}
                        >
                            <Text style={styles.avatarText}>
                                {user?.email?.charAt(0).toUpperCase() || 'U'}
                            </Text>
                        </LinearGradient>
                        <View style={styles.userDetails}>
                            <Text
                                style={[
                                    styles.userName,
                                    { color: theme.colors.text },
                                ]}
                            >
                                {(() => {
                                    const username = user?.email?.split('@')[0];
                                    if (!username) return 'User';
                                    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
                                })()}
                            </Text>
                            <Text
                                style={[
                                    styles.userEmail,
                                    { color: theme.colors.textSecondary },
                                ]}
                            >
                                {user?.email || 'user@lykos.com'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text
                                style={[
                                    styles.statValue,
                                    { color: theme.colors.text },
                                ]}
                            >
                                {wallets.length}
                            </Text>
                            <Text
                                style={[
                                    styles.statLabel,
                                    { color: theme.colors.textSecondary },
                                ]}
                            >
                                Wallets
                            </Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text
                                style={[
                                    styles.statValue,
                                    { color: theme.colors.text },
                                ]}
                            >
                                {user?.rewards || 0}
                            </Text>
                            <Text
                                style={[
                                    styles.statLabel,
                                    { color: theme.colors.textSecondary },
                                ]}
                            >
                                EXP Points
                            </Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text
                                style={[
                                    styles.statValue,
                                    { color: theme.colors.primary },
                                ]}
                            >
                                {user?.isPro ? 'PRO' : 'FREE'}
                            </Text>
                            <Text
                                style={[
                                    styles.statLabel,
                                    { color: theme.colors.textSecondary },
                                ]}
                            >
                                Plan
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* Quick Help Card */}
                <LinearGradient
                    colors={[`${theme.colors.gradientStart}15`, `${theme.colors.gradientEnd}15`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        padding: theme.spacing.lg,
                        marginBottom: theme.spacing.lg,
                        borderRadius: theme.borderRadius.lg,
                        borderWidth: 1,
                        borderColor: `${theme.colors.primary}30`,
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.xs }}>
                        <LinearGradient
                            colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: theme.spacing.sm,
                            }}
                        >
                            <Ionicons name="help-circle" size={18} color="#fff" />
                        </LinearGradient>
                        <Text
                            style={{
                                fontSize: theme.fontSize.md,
                                fontWeight: theme.fontWeight.bold,
                                color: theme.colors.text,
                            }}
                        >
                            Need Help?
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: theme.fontSize.sm,
                            color: theme.colors.textSecondary,
                            lineHeight: 20,
                        }}
                    >
                        Check out our beginner's guide or contact support if you have questions.
                    </Text>
                </LinearGradient>

                {/* Account Section */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: theme.colors.textSecondary },
                    ]}
                >
                    YOUR ACCOUNT
                </Text>
                <Card variant="elevated" style={{ marginBottom: theme.spacing.lg }}>
                    <MenuItem
                        icon="gift"
                        label="Rewards & Points"
                        value={`${user?.rewards || 0} EXP`}
                        onPress={() => navigation.navigate('Rewards' as never)}
                    />
                    <MenuItem
                        icon="wallet"
                        label="My Wallets"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="time"
                        label="Transaction History"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="shield-checkmark"
                        label="Security & Privacy"
                        onPress={() => navigation.navigate('SecurityTab' as never)}
                    />
                </Card>

                {/* Preferences Section */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: theme.colors.textSecondary },
                    ]}
                >
                    PREFERENCES
                </Text>
                <Card variant="elevated" style={{ marginBottom: theme.spacing.lg }}>
                    <MenuItem
                        icon="settings"
                        label="Settings"
                        onPress={() => navigation.navigate('Settings' as never)}
                    />
                    <MenuItem
                        icon="moon"
                        label="Appearance"
                        value={getThemeLabel()}
                        onPress={handleAppearancePress}
                    />
                    <MenuItem
                        icon="language"
                        label="Language"
                        value="English"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="notifications"
                        label="Notifications"
                        onPress={() => { }}
                    />
                </Card>

                {/* Learning & Support */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: theme.colors.textSecondary },
                    ]}
                >
                    LEARNING & SUPPORT
                </Text>
                <Card variant="elevated" style={{ marginBottom: theme.spacing.lg }}>
                    <MenuItem
                        icon="school"
                        label="Crypto Basics Guide"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="help-circle"
                        label="Help Center & FAQs"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="chatbubble-ellipses"
                        label="Chat with Support"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="document-text"
                        label="Terms & Privacy"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="information-circle"
                        label="About Lykos"
                        value="v1.0.0"
                        showChevron={false}
                        onPress={() => { }}
                    />
                </Card>

                {/* Sign Out Button */}
                <Button
                    title="Sign Out"
                    onPress={handleSignOut}
                    variant="ghost"
                    fullWidth
                    style={{
                        marginTop: theme.spacing.md,
                        marginBottom: theme.spacing.xxl,
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        letterSpacing: 0.4,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 28,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 15,
    },
    statsRow: {
        flexDirection: 'row',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 13,
    },
    statDivider: {
        width: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.8,
        marginLeft: 16,
        marginBottom: 8,
        marginTop: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    menuLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    menuRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuValue: {
        fontSize: 15,
        marginRight: 4,
    },
});
