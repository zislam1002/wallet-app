/**
 * Settings Screen - App settings and preferences
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Switch,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useSettingsStore } from '../../store/settingsStore';
import { Card } from '../../components/Card';

type ThemeMode = 'light' | 'dark' | 'auto';

export const SettingsScreen = () => {
    const { theme, setTheme } = useTheme();
    const navigation = useNavigation();
    const { currency, language, notificationsEnabled, biometricsEnabled, toggleNotifications, toggleBiometrics, themeMode, setThemeMode } = useSettingsStore();

    const [selectedTheme, setSelectedTheme] = useState<ThemeMode>(themeMode === 'system' ? 'auto' : themeMode as ThemeMode);

    const handleThemeChange = async (mode: ThemeMode) => {
        setSelectedTheme(mode);
        if (mode === 'auto') {
            // Auto mode - follow system preference
            await setThemeMode('system');
            setTheme('auto');
        } else {
            await setThemeMode(mode);
            setTheme(mode);
        }
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
                                ? `${color}20`
                                : theme.colors.primary + '20',
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

    const ToggleMenuItem = ({
        icon,
        label,
        value,
        onToggle,
        color,
    }: {
        icon: keyof typeof Ionicons.glyphMap;
        label: string;
        value: boolean;
        onToggle: (value: boolean) => void;
        color?: string;
    }) => (
        <View
            style={[
                styles.menuItem,
                {
                    backgroundColor: theme.colors.card,
                    borderBottomColor: theme.colors.border,
                },
            ]}
        >
            <View style={styles.menuLeft}>
                <View
                    style={[
                        styles.iconContainer,
                        {
                            backgroundColor: color
                                ? `${color}20`
                                : theme.colors.primary + '20',
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
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#FFFFFF"
            />
        </View>
    );

    const ThemeOption = ({ mode, label, icon }: { mode: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }) => {
        const isSelected = selectedTheme === mode;
        return (
            <TouchableOpacity
                style={[
                    styles.themeOption,
                    {
                        backgroundColor: theme.colors.card,
                        borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                        borderWidth: isSelected ? 2 : 1,
                    },
                ]}
                onPress={() => handleThemeChange(mode)}
            >
                <View
                    style={[
                        styles.themeIconContainer,
                        {
                            backgroundColor: isSelected
                                ? theme.colors.primary + '20'
                                : theme.colors.background,
                        },
                    ]}
                >
                    <Ionicons
                        name={icon}
                        size={28}
                        color={isSelected ? theme.colors.primary : theme.colors.textSecondary}
                    />
                </View>
                <Text
                    style={[
                        styles.themeLabel,
                        {
                            color: isSelected ? theme.colors.primary : theme.colors.text,
                            fontWeight: isSelected ? '600' : '500',
                        },
                    ]}
                >
                    {label}
                </Text>
                {isSelected && (
                    <View style={[styles.checkmark, { backgroundColor: theme.colors.primary }]}>
                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            {/* Header with Back Button */}
            <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Settings</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Appearance Section */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: theme.colors.textSecondary },
                    ]}
                >
                    APPEARANCE
                </Text>

                <View style={styles.themeGrid}>
                    <ThemeOption mode="light" label="Light" icon="sunny" />
                    <ThemeOption mode="dark" label="Dark" icon="moon" />
                    <ThemeOption mode="auto" label="Auto" icon="phone-portrait" />
                </View>

                {/* General Section */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: theme.colors.textSecondary },
                    ]}
                >
                    GENERAL
                </Text>
                <Card variant="elevated" style={{ marginBottom: theme.spacing.lg }}>
                    <MenuItem
                        icon="cash"
                        label="Currency"
                        value={currency}
                        onPress={() => Alert.alert('Coming Soon', 'Currency selection will be available soon')}
                    />
                    <MenuItem
                        icon="language"
                        label="Language"
                        value={language}
                        onPress={() => Alert.alert('Coming Soon', 'Language selection will be available soon')}
                    />
                </Card>

                {/* Security Section */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: theme.colors.textSecondary },
                    ]}
                >
                    SECURITY
                </Text>
                <Card variant="elevated" style={{ marginBottom: theme.spacing.lg }}>
                    <ToggleMenuItem
                        icon="finger-print"
                        label="Biometric Authentication"
                        value={biometricsEnabled}
                        onToggle={toggleBiometrics}
                        color="#FF9500"
                    />
                    <ToggleMenuItem
                        icon="notifications"
                        label="Push Notifications"
                        value={notificationsEnabled}
                        onToggle={toggleNotifications}
                    />
                    <MenuItem
                        icon="shield-checkmark"
                        label="Two-Factor Authentication"
                        value="Enabled"
                        onPress={() => { }}
                        color="#34C759"
                    />
                    <MenuItem
                        icon="lock-closed"
                        label="Change Password"
                        onPress={() => Alert.alert('Coming Soon', 'Password change will be available soon')}
                        color="#AF52DE"
                    />
                </Card>

                {/* Data & Privacy Section */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: theme.colors.textSecondary },
                    ]}
                >
                    DATA & PRIVACY
                </Text>
                <Card variant="elevated" style={{ marginBottom: theme.spacing.lg }}>
                    <MenuItem
                        icon="analytics"
                        label="Usage Analytics"
                        value="On"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="eye-off"
                        label="Privacy Settings"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="download"
                        label="Export Data"
                        onPress={() => Alert.alert('Coming Soon', 'Data export will be available soon')}
                    />
                </Card>

                {/* Advanced Section */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: theme.colors.textSecondary },
                    ]}
                >
                    ADVANCED
                </Text>
                <Card variant="elevated" style={{ marginBottom: theme.spacing.xl }}>
                    <MenuItem
                        icon="code-slash"
                        label="Developer Mode"
                        value="Off"
                        onPress={() => { }}
                        color="#5856D6"
                    />
                    <MenuItem
                        icon="server"
                        label="RPC Settings"
                        onPress={() => Alert.alert('Coming Soon', 'RPC settings will be available soon')}
                        color="#00C7BE"
                    />
                    <MenuItem
                        icon="refresh"
                        label="Clear Cache"
                        onPress={() => Alert.alert('Clear Cache', 'Are you sure you want to clear the app cache?')}
                        showChevron={false}
                        color="#FF3B30"
                    />
                </Card>
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
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
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
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
    themeGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    themeOption: {
        width: '31%',
        aspectRatio: 1,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        position: 'relative',
    },
    themeIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        marginBottom: 12,
    },
    themeLabel: {
        fontSize: 14,
    },
    checkmark: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
    },
});
