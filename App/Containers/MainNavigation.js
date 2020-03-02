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
import { fadeIn, fromRight } from 'react-navigation-transitions'

// Screens
import JournalsScreen from './JournalsScreen'
import EmojiScreen from './EmojiScreen'
import JournalScreen from './JournalScreen'
import PaywallScreen from './PaywallScreen'
import ComingSoonScreen from './ComingSoonScreen'
import WebView from './WebView'
import JournalCategoryScreen from './JournalCategoryScreen'
import SettingsScreen from './SettingsScreen'
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
import JourneyScreen from '../MellowContainers/JourneyScreen'
import MultiQuestionScreen from '../MellowContainers/MultiQuestionScreen'
import ActivityEditScreen from '../MellowContainers/ActivityEditScreen'
import ProfileScreen from '../MellowContainers/ProfileScreen'
import EditProfileScreen from '../MellowContainers/EditProfileScreen'

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
        // Journey: JournalsStack,
        Journey: JourneyScreen,
        Home: HomeStack,
        // Profile: MoodCalendarScreen
        Profile: ProfileScreen
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state
                let icon
                if (routeName === 'Home') {
                    icon = Images.tinyLogo
                } else if (routeName === 'Journey') {
                    icon = Images.achievements
                } else if (routeName === 'Profile') {
                    icon = Images.profile
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

const TabsStack = createStackNavigator(
    {
        Tabs: {
            screen: Tabs
        },
        ActivityEdit: {
            screen: ActivityEditScreen
        },
        MultiQuestion: {
            screen: MultiQuestionScreen
        },
        ReflectionQuestion: {
            screen: ReflectionQuestionScreen
        },
        EditProfile: {
            screen: EditProfileScreen
        }
    },
    {
        defaultNavigationOptions: {
            header: null
        },
        transitionConfig: () => fromRight()
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
