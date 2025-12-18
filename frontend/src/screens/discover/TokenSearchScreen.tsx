/**
 * Token Search Screen - Search and view token information
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { Card } from '../../components/Card';

export const TokenSearchScreen = ({ navigation, route }: any) => {
    const { theme } = useTheme();
    const { type = 'Token' } = route?.params || {};
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: theme.spacing.lg, paddingBottom: theme.spacing.md }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: theme.spacing.md }}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: theme.fontSize.xl,
                    fontWeight: theme.fontWeight.bold,
                    color: theme.colors.text,
                }}>
                    Search {type}
                </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: theme.spacing.lg, paddingTop: 0 }}>
                {/* Search Bar */}
                <View
                    style={{
                        backgroundColor: `${theme.colors.card}E6`,
                        borderRadius: theme.borderRadius.lg,
                        padding: theme.spacing.md,
                        borderWidth: 1.5,
                        borderColor: searchQuery.length > 0 ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255, 255, 255, 0.3)',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: theme.spacing.md,
                        shadowColor: theme.colors.shadow,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.15,
                        shadowRadius: 10,
                        elevation: 3,
                    }}
                >
                    <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={{ marginRight: theme.spacing.sm }} />
                    <TextInput
                        placeholder={`Search ${type.toLowerCase()}s...`}
                        placeholderTextColor={theme.colors.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={{
                            flex: 1,
                            fontSize: theme.fontSize.md,
                            color: theme.colors.text,
                        }}
                        autoFocus
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Category Pill */}
                <View style={{ flexDirection: 'row', marginBottom: theme.spacing.lg }}>
                    <View style={{
                        backgroundColor: 'rgba(99, 102, 241, 0.12)',
                        paddingHorizontal: theme.spacing.lg,
                        paddingVertical: theme.spacing.sm,
                        borderRadius: theme.borderRadius.full,
                        borderWidth: 1,
                        borderColor: 'rgba(99, 102, 241, 0.3)',
                        shadowColor: theme.colors.primary,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        elevation: 2,
                    }}>
                        <Text style={{
                            fontSize: theme.fontSize.md,
                            fontWeight: theme.fontWeight.semibold,
                            color: theme.colors.text,
                        }}>
                            {type}
                        </Text>
                    </View>
                </View>

                {/* Token Info Card */}
                <Card variant="elevated" style={{
                    padding: theme.spacing.xl,
                    minHeight: 300,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {searchQuery.length > 0 ? (
                        <View style={{ alignItems: 'center' }}>
                            <View style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: theme.spacing.lg,
                                borderWidth: 1.5,
                                borderColor: 'rgba(99, 102, 241, 0.3)',
                                shadowColor: theme.colors.primary,
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.2,
                                shadowRadius: 8,
                                elevation: 4,
                            }}>
                                <Ionicons name="information-circle" size={40} color={theme.colors.primary} />
                            </View>
                            <Text style={{
                                fontSize: theme.fontSize.lg,
                                fontWeight: theme.fontWeight.bold,
                                color: theme.colors.text,
                                marginBottom: theme.spacing.sm,
                                textAlign: 'center',
                            }}>
                                {type} Info Formatted
                            </Text>
                            <Text style={{
                                fontSize: theme.fontSize.md,
                                color: theme.colors.textSecondary,
                                textAlign: 'center',
                                lineHeight: 22,
                            }}>
                                Search results for "{searchQuery}" will appear here
                            </Text>
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 48, marginBottom: theme.spacing.md }}>🔍</Text>
                            <Text style={{
                                fontSize: theme.fontSize.md,
                                color: theme.colors.textSecondary,
                                textAlign: 'center',
                            }}>
                                Start typing to search for {type.toLowerCase()}s
                            </Text>
                        </View>
                    )}
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
