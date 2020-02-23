/**
 * @flow
 */
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Images, Colors, AppStyles, Fonts } from 'Themes'
import { modalFriendlyTransition } from './transitions'
import { fadeIn } from 'react-navigation-transitions'

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
// import OnboardingScreen from './OnboardingScreen'
import MoodCalendarScreen from './MoodCalendarScreen'
import JournalReviewScreen from './JournalReviewScreen'
import DailyGoalsScreen from './DailyGoalsScreen'
import GoalSelectScreen from './GoalSelectScreen'
import LandingScreen from '../MellowContainers/LandingScreen'
import OnboardingA from '../MellowContainers/OnboardingA'
import OnboardingB from '../MellowContainers/OnboardingB'
import OnboardingC from '../MellowContainers/OnboardingC'
import OnboardingD from '../MellowContainers/OnboardingD'
import PersonalizeA from '../MellowContainers/PersonalizeA'
import PersonalizeB from '../MellowContainers/PersonalizeB'
import PersonalizeC from '../MellowContainers/PersonalizeC'
import CreateAccount from '../MellowContainers/CreateAccount'
import ReflectionQuestionScreen from '../MellowContainers/ReflectionQuestionScreen'
import SignIn from '../MellowContainers/SignIn'
import ResetPassword from '../MellowContainers/ResetPassword'
import MellowHomeScreen from '../MellowContainers/HomeScreen'

const styles = StyleSheet.create({
    activeIcon: {
        opacity: 1,
        tintColor: Colors.Blue2,
        resizeMode: 'contain',
        height: 30
    },
    inactiveIcon: {
        tintColor: Colors.GreyXL,
        resizeMode: 'contain',
        height: 30
    },
    tabBarStyle: {
        backgroundColor: Colors.WhiteM,
        borderTopWidth: 1,
        borderTopColor: Colors.FrostL,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.1
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
        MellowHomeScreen,
        Settings: SettingsScreen
    },
    {
        initialRouteName: 'MellowHomeScreen',
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

const Tabs = createBottomTabNavigator(
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

const DailyReflectionStack = createStackNavigator(
    {
        ReflectionQuestion: {
            screen: ReflectionQuestionScreen
        }
    },
    {
        defaultNavigationOptions: {
            header: null
        },
        transitionConfig: () => fadeIn()
    }
)

const TabsStack = createStackNavigator(
    {
        Tabs: {
            screen: Tabs
        },
        DailyReflection: DailyReflectionStack
    },
    {
        defaultNavigationOptions: {
            header: null
        }
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

const GoalsStack = createStackNavigator(
    {
        DailyGoals: DailyGoalsScreen,
        GoalSelect: GoalSelectScreen
    },
    {
        ...modalFriendlyTransition
    }
)

const LoggedInStack = createStackNavigator(
    {
        Tabs: {
            screen: TabsStack
        },
        Emoji: {
            screen: EmojiScreen
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
        Goals: {
            screen: GoalsStack
        },
        Journal: {
            screen: JournalScreen
        },
        WebView
    },
    {
        ...modalFriendlyTransition
    }
)

const OnboardingStack = createStackNavigator(
    {
        Landing: {
            screen: LandingScreen
        },
        OnboardingA,
        OnboardingB,
        OnboardingC,
        OnboardingD,
        PersonalizeA,
        PersonalizeB,
        PersonalizeC,
        CreateAccount,
        SignIn,
        ResetPassword
    },
    {
        ...modalFriendlyTransition,
        initialRouteName: 'Landing',
        transitionConfig: () => fadeIn()
    }
)

const createMainNavigation = (loggedIn: boolean) => {
    const nav = createSwitchNavigator(
        {
            LoggedIn: LoggedInStack,
            // Onboarding: OnboardingScreen
            // Onboarding: CreateAccount
            Onboarding: OnboardingStack
        },
        {
            initialRouteName: loggedIn ? 'LoggedIn' : 'Onboarding'
        }
    )

    return nav
}

export default createMainNavigation
