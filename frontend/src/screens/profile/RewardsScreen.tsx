/**
 * Rewards Screen - EXP points and rewards history
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/Card';
import { LinearGradient } from 'expo-linear-gradient';

export const RewardsScreen = () => {
    const { theme } = useTheme();
    const { user } = useAuthStore();
    const navigation = useNavigation();

    const rewards = user?.rewards || 0;
    const level = Math.floor(rewards / 100) + 1;
    const nextLevelExp = level * 100;
    const progress = (rewards % 100) / 100;

    const rewardHistory = [
        {
            id: '1',
            title: 'First Transaction',
            description: 'Complete your first transaction',
            exp: 10,
            date: 'Yesterday',
            icon: 'paper-plane' as keyof typeof Ionicons.glyphMap,
        },
        {
            id: '2',
            title: 'First Swap',
            description: 'Complete your first token swap',
            exp: 25,
            date: '2 days ago',
            icon: 'swap-horizontal' as keyof typeof Ionicons.glyphMap,
        },
        {
            id: '3',
            title: 'Enable 2FA',
            description: 'Secure your account with 2FA',
            exp: 50,
            date: '3 days ago',
            icon: 'shield-checkmark' as keyof typeof Ionicons.glyphMap,
        },
        {
            id: '4',
            title: 'Wallet Backup',
            description: 'Back up your recovery phrase',
            exp: 50,
            date: '5 days ago',
            icon: 'cloud-upload' as keyof typeof Ionicons.glyphMap,
        },
        {
            id: '5',
            title: 'Welcome Bonus',
            description: 'Join Lykos Wallet',
            exp: 15,
            date: '1 week ago',
            icon: 'gift' as keyof typeof Ionicons.glyphMap,
        },
    ];

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
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Rewards</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Level Card */}
                <Card
                    variant="elevated"
                    style={{
                        padding: 0,
                        marginBottom: theme.spacing.lg,
                        overflow: 'hidden',
                    }}
                >
                    <LinearGradient
                        colors={[theme.colors.primary, theme.colors.primary + '80']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.levelCard}
                    >
                        <View style={styles.levelHeader}>
                            <View>
                                <Text style={styles.levelLabel}>Your Level</Text>
                                <Text style={styles.levelNumber}>Level {level}</Text>
                            </View>
                            <View style={styles.expBadge}>
                                <Ionicons name="star" size={24} color="#FFD700" />
                                <Text style={styles.expText}>{rewards} EXP</Text>
                            </View>
                        </View>

                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${progress * 100}%` },
                                    ]}
                                />
                            </View>
                            <Text style={styles.progressText}>
                                {100 - (rewards % 100)} EXP to Level {level + 1}
                            </Text>
                        </View>
                    </LinearGradient>
                </Card>

                {/* Earn More Section */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: theme.colors.text },
                    ]}
                >
                    Ways to Earn
                </Text>

                <View style={styles.earnGrid}>
                    <Card
                        variant="elevated"
                        style={{ ...styles.earnCard, padding: theme.spacing.lg }}
                    >
                        <View
                            style={[
                                styles.earnIcon,
                                { backgroundColor: theme.colors.success + '20' },
                            ]}
                        >
                            <Ionicons
                                name="paper-plane"
                                size={24}
                                color={theme.colors.success}
                            />
                        </View>
                        <Text style={[styles.earnTitle, { color: theme.colors.text }]}>
                            Transactions
                        </Text>
                        <Text
                            style={[
                                styles.earnDesc,
                                { color: theme.colors.textSecondary },
                            ]}
                        >
                            +10 EXP each
                        </Text>
                    </Card>

                    <Card
                        variant="elevated"
                        style={{ ...styles.earnCard, padding: theme.spacing.lg }}
                    >
                        <View
                            style={[
                                styles.earnIcon,
                                { backgroundColor: theme.colors.primary + '20' },
                            ]}
                        >
                            <Ionicons
                                name="swap-horizontal"
                                size={24}
                                color={theme.colors.primary}
                            />
                        </View>
                        <Text style={[styles.earnTitle, { color: theme.colors.text }]}>
                            Swaps
                        </Text>
                        <Text
                            style={[
                                styles.earnDesc,
                                { color: theme.colors.textSecondary },
                            ]}
                        >
                            +25 EXP each
                        </Text>
                    </Card>

                    <Card
                        variant="elevated"
                        style={{ ...styles.earnCard, padding: theme.spacing.lg }}
                    >
                        <View
                            style={[
                                styles.earnIcon,
                                { backgroundColor: '#FF9500' + '20' },
                            ]}
                        >
                            <Ionicons name="shield-checkmark" size={24} color="#FF9500" />
                        </View>
                        <Text style={[styles.earnTitle, { color: theme.colors.text }]}>
                            Security
                        </Text>
                        <Text
                            style={[
                                styles.earnDesc,
                                { color: theme.colors.textSecondary },
                            ]}
                        >
                            +50 EXP
                        </Text>
                    </Card>

                    <Card
                        variant="elevated"
                        style={{ ...styles.earnCard, padding: theme.spacing.lg }}
                    >
                        <View
                            style={[
                                styles.earnIcon,
                                { backgroundColor: '#AF52DE' + '20' },
                            ]}
                        >
                            <Ionicons name="people" size={24} color="#AF52DE" />
                        </View>
                        <Text style={[styles.earnTitle, { color: theme.colors.text }]}>
                            Referrals
                        </Text>
                        <Text
                            style={[
                                styles.earnDesc,
                                { color: theme.colors.textSecondary },
                            ]}
                        >
                            +100 EXP
                        </Text>
                    </Card>
                </View>

                {/* Rewards History */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: theme.colors.text, marginTop: theme.spacing.xl },
                    ]}
                >
                    Recent Rewards
                </Text>

                <Card variant="elevated" style={{ marginBottom: theme.spacing.xl }}>
                    {rewardHistory.map((reward, index) => (
                        <View
                            key={reward.id}
                            style={[
                                styles.rewardItem,
                                {
                                    backgroundColor: theme.colors.card,
                                    borderBottomColor: theme.colors.border,
                                    borderBottomWidth:
                                        index < rewardHistory.length - 1 ? 0.5 : 0,
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.rewardIcon,
                                    { backgroundColor: theme.colors.primary + '20' },
                                ]}
                            >
                                <Ionicons
                                    name={reward.icon}
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            </View>
                            <View style={styles.rewardContent}>
                                <Text
                                    style={[
                                        styles.rewardTitle,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    {reward.title}
                                </Text>
                                <Text
                                    style={[
                                        styles.rewardDesc,
                                        { color: theme.colors.textSecondary },
                                    ]}
                                >
                                    {reward.description}
                                </Text>
                                <Text
                                    style={[
                                        styles.rewardDate,
                                        { color: theme.colors.textSecondary },
                                    ]}
                                >
                                    {reward.date}
                                </Text>
                            </View>
                            <View style={styles.rewardExp}>
                                <Text
                                    style={[
                                        styles.expValue,
                                        { color: theme.colors.success },
                                    ]}
                                >
                                    +{reward.exp}
                                </Text>
                                <Text
                                    style={[
                                        styles.expLabel,
                                        { color: theme.colors.textSecondary },
                                    ]}
                                >
                                    EXP
                                </Text>
                            </View>
                        </View>
                    ))}
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
    levelCard: {
        padding: 24,
    },
    levelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    levelLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 4,
    },
    levelNumber: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    expBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    expText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 6,
    },
    progressContainer: {
        marginTop: 8,
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
    },
    earnGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    earnCard: {
        width: '48%',
        marginBottom: 12,
        alignItems: 'center' as 'center',
    },
    earnIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    earnTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    earnDesc: {
        fontSize: 13,
    },
    rewardItem: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    rewardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    rewardContent: {
        flex: 1,
    },
    rewardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    rewardDesc: {
        fontSize: 14,
        marginBottom: 4,
    },
    rewardDate: {
        fontSize: 12,
    },
    rewardExp: {
        alignItems: 'flex-end',
        marginLeft: 12,
    },
    expValue: {
        fontSize: 18,
        fontWeight: '600',
    },
    expLabel: {
        fontSize: 12,
    },
});
