/**
 * Root Navigation for Lykos Wallet
 * Handles auth flow and main app navigation
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '../store/authStore';
import { useSettingsStore } from '../store/settingsStore';
import { useTheme } from '../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

// Auth screens
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { CreateWalletScreen } from '../screens/auth/CreateWalletScreen';
import { TwoFASetupScreen } from '../screens/auth/TwoFASetupScreen';

// Main app screens
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { RewardsScreen } from '../screens/profile/RewardsScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { PortfolioScreen } from '../screens/portfolio/PortfolioScreen';
import { LearnScreen } from '../screens/LearnScreen';
import { DiscoverScreen } from '../screens/discover/DiscoverScreen';
import { SendScreen } from '../screens/discover/SendScreen';
import { ReceiveScreen } from '../screens/discover/ReceiveScreen';
import { SwapScreen } from '../screens/discover/SwapScreen';
import { TokenSearchScreen } from '../screens/discover/TokenSearchScreen';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder screens
const PlaceholderScreen = ({ name }: { name: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{name} - Coming Soon</Text>
    </View>
);

// Stack navigators for each tab
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Portfolio" component={PortfolioScreen} />
            <Stack.Screen name="Learn" component={LearnScreen} />
        </Stack.Navigator>
    );
};

const DiscoverStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Discover" component={DiscoverScreen} />
            <Stack.Screen name="TokenSearch" component={TokenSearchScreen} />
            <Stack.Screen name="Send" component={SendScreen} />
            <Stack.Screen name="Receive" component={ReceiveScreen} />
            <Stack.Screen name="Swap" component={SwapScreen} />
        </Stack.Navigator>
    );
};

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Rewards" component={RewardsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
};

// Main tabs
const MainTabs = () => {
    const { theme } = useTheme();

    const TabIcon = ({ name, color, size, focused }: { name: any; color: string; size: number; focused: boolean }) => (
        <View style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: focused ? `${theme.colors.primary}20` : 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Ionicons name={name} size={size} color={color} />
        </View>
    );

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: theme.colors.card,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.border,
                    elevation: 0,
                    height: 88,
                    paddingBottom: 34,
                    paddingTop: 8,
                },
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabIcon name="home" color={color} size={size} focused={focused} />
                    ),
                }}
            />
            <Tab.Screen
                name="DiscoverTab"
                component={DiscoverStack}
                options={{
                    tabBarLabel: 'Discover',
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabIcon name="compass" color={color} size={size} focused={focused} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabIcon name="person" color={color} size={size} focused={focused} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

// Auth stack
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="CreateWallet" component={CreateWalletScreen} />
            <Stack.Screen name="TwoFASetup" component={TwoFASetupScreen} />
        </Stack.Navigator>
    );
};

// Root navigator
export const RootNavigator = () => {
    const { isAuthenticated, isLoading, loadAuth } = useAuthStore();
    const { loadSettings } = useSettingsStore();

    useEffect(() => {
        loadAuth();
        loadSettings();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <Stack.Screen name="Auth" component={AuthStack} />
                ) : (
                    <Stack.Screen name="Main" component={MainTabs} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
