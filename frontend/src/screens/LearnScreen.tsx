/**
 * Learn Screen - Educational content for crypto beginners
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { Card } from '../components/Card';

type Topic = {
    id: string;
    emoji: string;
    title: string;
    summary: string;
    content: string;
    gradientColors: [string, string];
};

export const LearnScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

    const topics: Topic[] = [
        {
            id: 'wallet',
            emoji: '👛',
            title: 'What is a Wallet?',
            summary: 'Your digital safe for crypto',
            content:
                'A crypto wallet is like a bank account for digital money. It keeps your crypto safe and lets you send and receive it. Your wallet has a unique address (like an account number) that others use to send you crypto.',
            gradientColors: [theme.colors.gradientStart, theme.colors.gradientMiddle],
        },
        {
            id: 'address',
            emoji: '📍',
            title: 'Wallet Address',
            summary: 'Your unique crypto account number',
            content:
                'A wallet address is a long string of letters and numbers (like: 0x742d35...). Think of it as your email address for crypto - people need it to send you funds. You can share it safely with anyone.',
            gradientColors: [theme.colors.success, '#059669'],
        },
        {
            id: 'blockchain',
            emoji: '⛓️',
            title: 'What is Blockchain?',
            summary: 'The technology behind crypto',
            content:
                'A blockchain is like a digital ledger that records all transactions. It\'s secure because many computers verify each transaction, making it nearly impossible to cheat. Each blockchain (like Ethereum, Bitcoin) is separate.',
            gradientColors: [theme.colors.secondary, '#BE185D'],
        },
        {
            id: 'gas',
            emoji: '⛽',
            title: 'Gas Fees',
            summary: 'The cost of transactions',
            content:
                'Gas fees are like postage stamps for crypto. When you send crypto, you pay a small fee to the network. The fee varies based on how busy the network is - like rush hour traffic.',
            gradientColors: [theme.colors.warning, '#F59E0B'],
        },
        {
            id: 'send-receive',
            emoji: '💸',
            title: 'Sending & Receiving',
            summary: 'How to transfer crypto',
            content:
                'Receiving: Share your wallet address with the sender. They send crypto to that address, and it appears in your wallet automatically.\n\nSending: Get the recipient\'s address, enter the amount, review the fee, and confirm. The transaction usually takes a few minutes.',
            gradientColors: [theme.colors.primary, theme.colors.primaryDark],
        },
        {
            id: 'swap',
            emoji: '🔄',
            title: 'Swapping Tokens',
            summary: 'Exchange one crypto for another',
            content:
                'Swapping lets you trade one type of crypto for another (like exchanging dollars for euros). You don\'t need to send it to an exchange - it happens right in your wallet!',
            gradientColors: [theme.colors.gradientMiddle, theme.colors.gradientEnd],
        },
        {
            id: 'bridge',
            emoji: '🌉',
            title: 'Cross-Chain Bridge',
            summary: 'Move crypto between blockchains',
            content:
                'Bridging moves your crypto from one blockchain to another (like moving money from one bank to another). This is useful because different blockchains have different features and fees.',
            gradientColors: [theme.colors.primary, '#0EA5E9'],
        },
        {
            id: 'security',
            emoji: '🔒',
            title: 'Staying Safe',
            summary: 'Protect your crypto',
            content:
                'Key safety tips:\n\n• Never share your recovery phrase\n• Double-check addresses before sending\n• Use 2FA (two-factor authentication)\n• Only use official apps and websites\n• Be wary of messages asking for money or info\n• Start with small amounts when learning',
            gradientColors: [theme.colors.error, '#DC2626'],
        },
    ];

    const toggleTopic = (topicId: string) => {
        setExpandedTopic(expandedTopic === topicId ? null : topicId);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { padding: theme.spacing.lg }]}>
                <Text
                    style={{
                        fontSize: 32,
                        fontWeight: theme.fontWeight.bold,
                        color: theme.colors.text,
                        marginBottom: theme.spacing.xs,
                    }}
                >
                    Learn Crypto 📚
                </Text>
                <Text
                    style={{
                        fontSize: theme.fontSize.md,
                        color: theme.colors.textSecondary,
                    }}
                >
                    Everything you need to know to get started
                </Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={{ padding: theme.spacing.lg }}
                showsVerticalScrollIndicator={false}
            >
                {/* Quick Start Card */}
                <LinearGradient
                    colors={[`${theme.colors.gradientStart}20`, `${theme.colors.gradientEnd}20`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        padding: theme.spacing.lg,
                        borderRadius: theme.borderRadius.lg,
                        marginBottom: theme.spacing.xl,
                        borderWidth: 1,
                        borderColor: `${theme.colors.primary}30`,
                    }}
                >
                    <Text
                        style={{
                            fontSize: theme.fontSize.lg,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.colors.text,
                            marginBottom: theme.spacing.sm,
                        }}
                    >
                        🚀 Quick Start Guide
                    </Text>
                    <View style={{ marginLeft: theme.spacing.sm }}>
                        <Text
                            style={{
                                fontSize: theme.fontSize.sm,
                                color: theme.colors.text,
                                lineHeight: 24,
                                marginBottom: theme.spacing.xs,
                            }}
                        >
                            1. Start by viewing your wallet address (tap Receive)
                        </Text>
                        <Text
                            style={{
                                fontSize: theme.fontSize.sm,
                                color: theme.colors.text,
                                lineHeight: 24,
                                marginBottom: theme.spacing.xs,
                            }}
                        >
                            2. Get some crypto from a friend or exchange
                        </Text>
                        <Text
                            style={{
                                fontSize: theme.fontSize.sm,
                                color: theme.colors.text,
                                lineHeight: 24,
                                marginBottom: theme.spacing.xs,
                            }}
                        >
                            3. Try sending a small amount to test
                        </Text>
                        <Text
                            style={{
                                fontSize: theme.fontSize.sm,
                                color: theme.colors.text,
                                lineHeight: 24,
                                marginBottom: theme.spacing.xs,
                            }}
                        >
                            4. Explore swapping and other features
                        </Text>
                    </View>
                </LinearGradient>

                {/* Topics */}
                {topics.map((topic, index) => (
                    <TouchableOpacity
                        key={topic.id}
                        onPress={() => toggleTopic(topic.id)}
                        activeOpacity={0.8}
                        style={{ marginBottom: theme.spacing.md }}
                    >
                        <Card variant="elevated">
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <LinearGradient
                                    colors={topic.gradientColors}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 16,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: theme.spacing.md,
                                    }}
                                >
                                    <Text style={{ fontSize: 28 }}>{topic.emoji}</Text>
                                </LinearGradient>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.md,
                                            fontWeight: theme.fontWeight.bold,
                                            color: theme.colors.text,
                                            marginBottom: 2,
                                        }}
                                    >
                                        {topic.title}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.sm,
                                            color: theme.colors.textSecondary,
                                        }}
                                    >
                                        {topic.summary}
                                    </Text>
                                </View>
                                <Ionicons
                                    name={expandedTopic === topic.id ? 'chevron-up' : 'chevron-down'}
                                    size={24}
                                    color={theme.colors.textSecondary}
                                />
                            </View>

                            {expandedTopic === topic.id && (
                                <View
                                    style={{
                                        marginTop: theme.spacing.md,
                                        paddingTop: theme.spacing.md,
                                        borderTopWidth: 1,
                                        borderTopColor: theme.colors.border,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: theme.fontSize.sm,
                                            color: theme.colors.text,
                                            lineHeight: 22,
                                        }}
                                    >
                                        {topic.content}
                                    </Text>
                                </View>
                            )}
                        </Card>
                    </TouchableOpacity>
                ))}

                {/* Bottom spacing */}
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {},
    content: {
        flex: 1,
    },
});
