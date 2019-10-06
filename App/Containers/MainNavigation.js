/**
 * @flow
 */
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { Images, Colors, Metrics, AppStyles, Fonts } from 'Themes'
import { modalFriendlyTransition } from './transitions'
import { isIphoneX } from 'Themes/Metrics'

// Components
import V from 'Components/V'

// Screens
import HomeScreen from './HomeScreen'
import JournalsScreen from './JournalsScreen'
import EmojiScreen from './EmojiScreen'
import JournalScreen from './JournalScreen'
import PaywallScreen from './PaywallScreen'
import ComingSoonScreen from './ComingSoonScreen'
import WebView from './WebView'
import JournalCategoryScreen from './JournalCategoryScreen'
import SettingsScreen from './SettingsScreen'
import OnboardingScreen from './OnboardingScreen'
import MoodCalendarScreen from './MoodCalendarScreen'
import JournalReviewScreen from './JournalReviewScreen'

const styles = StyleSheet.create({
    activeIcon: {
        opacity: 1,
        tintColor: Colors.BrandM,
        maxHeight: 40,
        resizeMode: 'contain'
    },
    inactiveIcon: {
        opacity: 0.35,
        tintColor: Colors.GreyM,
        maxHeight: 40,
        resizeMode: 'contain'
    },
    tabBarStyle: {
        backgroundColor: Colors.WhiteM,
        height: isIphoneX() ? 85 : 60,
        paddingTop: Metrics.padding.normal / 2,
        paddingBottom: isIphoneX() ? Metrics.padding.medium : Metrics.padding.small,
        borderTopWidth: 1,
        justifyContent: 'space-between',
        borderTopColor: Colors.FrostL
    }
})

const defaultTopNavigationStyle = {
    headerStyle: {
        backgroundColor: Colors.WhiteM,
        ...AppStyles.dropShadow.small
    },
    headerTintColor: Colors.GreyL,
    headerTitleStyle: {
        fontWeight: 'bold',
        ...Fonts.style.titleS
    },
    headerLayoutPreset: 'left'
}

const HomeStack = createStackNavigator(
    {
        HomeScreen,
        Settings: SettingsScreen
    },
    {
        initialRouteName: 'HomeScreen',
        defaultNavigationOptions: defaultTopNavigationStyle
    }
)

const JournalsStack = createStackNavigator(
    {
        JournalsScreen
    },
    {
        initialRouteName: 'JournalsScreen',
        defaultNavigationOptions: defaultTopNavigationStyle
    }
)

const Tabs = createMaterialTopTabNavigator(
    {
        Journals: JournalsStack,
        Home: HomeStack,
        MoodCalendar: MoodCalendarScreen
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state
                let icon
                if (routeName === 'Home') {
                    icon = Images.tinyLogo
                } else if (routeName === 'Journals') {
                    icon = Images.journal
                } else if (routeName === 'MoodCalendar') {
                    icon = Images.calendar
                }

                // You can return any component that you like here!
                // return <IconComponent name={iconName} size={25} color={tintColor} />
                return (
                    <Image
                        source={icon}
                        style={focused ? styles.activeIcon : styles.inactiveIcon}
                    />
                )
            }
        }),
        tabBarOptions: {
            style: styles.tabBarStyle,
            tabStyle: styles.tabBarTab,
            indicatorStyle: {
                height: 0
            },
            showIcon: true,
            showLabel: false
        },
        initialRouteName: 'Home',
        // activeColor: Colors.BrandM,
        // inactiveColor: Colors.GreyM,
        // barStyle: { backgroundColor: Colors.WhiteM, paddingBottom: Metrics.padding.small },
        tabBarPosition: 'bottom',
        animationEnabled: true
        // labeled: false
    }
)

const PaywallStack = createStackNavigator(
    {
        Paywall: PaywallScreen,
        ComingSoon: ComingSoonScreen
    },
    {
        headerMode: 'none'
    }
)

const LoggedInStack = createStackNavigator(
    {
        Tabs: {
            screen: Tabs
        },
        Emoji: {
            screen: EmojiScreen
        },
        Journal: {
            screen: JournalScreen
        },
        Paywall: {
            screen: PaywallStack
        },
        JournalCategory: {
            screen: JournalCategoryScreen
        },
        JournalReview: {
            screen: JournalReviewScreen
        },
        WebView
    },
    {
        ...modalFriendlyTransition
    }
)

const createMainNavigation = (onboardingCompleted: boolean) => {
    const nav = createSwitchNavigator(
        {
            LoggedIn: LoggedInStack,
            Onboarding: OnboardingScreen
        },
        {
            initialRouteName: onboardingCompleted ? 'LoggedIn' : 'Onboarding'
        }
    )

    return nav
}

export default createMainNavigation
