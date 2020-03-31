import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Images, Metrics, Colors } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'
import Card from 'MellowComponents/Card'
import { withNavigation } from 'react-navigation'
import Profile from 'Firebase/models/Profile'
import useUser from 'Hooks/useUser'

const ProfileRow = ({ leftImage, title, onPress }) => {
    return (
        <Touchable onPress={onPress}>
            <V p={2} row ai="center" jc="center">
                <V px={2}>
                    <Image
                        source={leftImage}
                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                    />
                </V>
                <T b1 color="Gray2">
                    {title}
                </T>
                <V flex={1} />
                <V px={2}>
                    <Image
                        source={Images.smallRightChevron}
                        style={{ height: 12, width: 12, resizeMode: 'contain' }}
                    />
                </V>
            </V>
        </Touchable>
    )
}

const Seperator = () => {
    return (
        <V flex={1} ai="center">
            <V
                style={{
                    width: Metrics.screenWidth - 5 * Metrics.padding.scale[3],
                    borderBottomWidth: 0.7,
                    opacity: 0.3,
                    borderBottomColor: Colors.Gray4
                }}
            />
        </V>
    )
}

const ProfileCard = ({ navigation, profile }) => {
    const { hasPro } = useUser()
    const navigateToEditName = () => {
        navigation.navigate('EditProfile')
    }

    const navigateToEditDailyReminder = () => {
        navigation.navigate('EditDailyReminder')
    }

    const navigateToResetPassword = () => {
        navigation.navigate('ResetPasswordLoggedIn')
    }
    const navigateToSetPin = () => {
        if (hasPro) {
            navigation.navigate('SetPin')
        } else {
            navigation.navigate('MellowPaywall')
        }
    }

    const logout = () => {
        Profile.signOut()
    }

    return (
        <Card bg="WhiteM" alt>
            <V p={1} py={2}>
                <V py={1}>
                    <ProfileRow
                        {...{
                            title: profile.displayName,
                            leftImage: Images.smallProfile,
                            onPress: navigateToEditName
                        }}
                    />
                    <Seperator />
                    <ProfileRow
                        {...{
                            title: 'Setup a daily reminder time',
                            leftImage: Images.bell,
                            onPress: navigateToEditDailyReminder
                        }}
                    />
                    <Seperator />
                    <ProfileRow
                        {...{
                            title: 'Lock your journals',
                            leftImage: Images.shieldLock,
                            onPress: navigateToSetPin
                        }}
                    />
                    <Seperator />
                    <ProfileRow
                        {...{
                            title: 'Reset password',
                            leftImage: Images.shield,
                            onPress: navigateToResetPassword
                        }}
                    />
                    <Seperator />
                    <ProfileRow
                        {...{
                            title: 'Logout',
                            leftImage: Images.logout,
                            onPress: logout
                        }}
                    />
                </V>
            </V>
        </Card>
    )
}

export default withNavigation(ProfileCard)
