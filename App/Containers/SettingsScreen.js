// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import AppConfig from 'Config/AppConfig'
import Analytics from 'Controllers/AnalyticsController'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Me from 'Apollo/queries/me'
import updateUserReflectionTime from 'Apollo/mutations/updateUserReflectionTimeMutation'
import { localToUtcTime, utcToLocalTime } from 'utils'
import Section from 'Components/Section'
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from 'Data/urls'
import Touchable from 'Components/Touchable'
import { Appearance } from 'react-native-appearance'

type Props = {}

type State = {}

const RowItem = (text, onPress) => {
    return (
        <Touchable {...{ onPress }}>
            <V p={3} row ai="center">
                <T color="GreyM">{text}</T>
                <V flex={1}>
                    <T ta="right" titleS color="GreyL">
                        >
                    </T>
                </V>
            </V>
        </Touchable>
    )
}

class SettingsScreen extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Settings'
    }

    constructor(props) {
        super(props)
        this.state = {
            isTimePickerVisible: false,
            error: false
        }
    }

    showTimePicker = () => {
        this.setState({ isTimePickerVisible: true })
    }

    hideTimePicker = () => {
        this.setState({ isTimePickerVisible: false })
    }

    setupPin = () => {
        Analytics.pressCreatePin()
        this.props.navigation.navigate('Paywall')
    }

    setupDailyReminder = () => {
        this.showTimePicker()
    }

    handleTimePicked = async time => {
        const hours = time.getHours()
        const minutes = time.getMinutes()
        await this.setState({ reflectionTimeHour: hours, reflectionTimeMin: minutes })
        const { hours: utcHours, minutes: utcMinutes } = localToUtcTime(hours, minutes)
        await updateUserReflectionTime(AppConfig.DEVICE_ID, utcHours, utcMinutes)
        Analytics.setDailyReflectionReminder()
        this.hideTimePicker()
    }

    getLocalTimeFromData = data => {
        const {
            me: {
                reflectionPush: { reflectionTimeHour, reflectionTimeMin }
            }
        } = data
        const { hours, minutes } = utcToLocalTime(reflectionTimeHour, reflectionTimeMin)
        return { hours, minutes }
    }

    setReflectionTime = async data => {
        const { hours, minutes } = this.getLocalTimeFromData(data)
        await this.setState({ reflectionTimeHour: hours, reflectionTimeMin: minutes })
    }

    setErrorState = () => {
        return this.setState({ error: true })
    }

    render() {
        return (
            <Screen>
                <V bg="BeigeL" p={3}>
                    <T color="GreyL" heading>
                        Account
                    </T>
                </V>
                {RowItem('⏰   Setup a daily reminder for your reflection', () =>
                    this.setupDailyReminder()
                )}
                {/* <V ai="center">
                    <V style={styles.divider} />
                </V>
                {RowItem('🔑   Set a pin to lock your journals', () => this.setupPin())} */}
                <V ai="center">
                    <V style={styles.divider} />
                </V>
                <V flex={1} jc="flex-end">
                    <V ai="center">
                        <T color="GreyL">
                            Version {AppConfig.APP_VERSION} {AppConfig.BUILD_VERSION}
                        </T>
                    </V>
                </V>
                <Me
                    deviceId={AppConfig.DEVICE_ID}
                    onCompleted={data => this.setReflectionTime(data)}
                    onError={error => this.setErrorState()}
                >
                    {({ loading, error, data }) => {
                        if (loading) return null
                        if (error || this.state.error)
                            return (
                                <T
                                    ta="center"
                                    color="RedL"
                                    p={2}
                                >{`Error: You need a network connection!`}</T>
                            )
                        let reflectionTime = new Date()
                        if (this.state.reflectionTimeHour) {
                            reflectionTime.setHours(this.state.reflectionTimeHour)
                            reflectionTime.setMinutes(this.state.reflectionTimeMin)
                        } else {
                            const { hours, minutes } = this.getLocalTimeFromData(data)
                            reflectionTime.setHours(hours)
                            reflectionTime.setMinutes(minutes)
                        }
                        const colorScheme = Appearance.getColorScheme()
                        return (
                            <DateTimePicker
                                isVisible={this.state.isTimePickerVisible}
                                onConfirm={this.handleTimePicked}
                                onCancel={this.hideTimePicker}
                                mode="time"
                                date={reflectionTime}
                                isDarkModeEnabled={colorScheme === 'dark'}
                            />
                        )
                    }}
                </Me>
                <Section ai="center">
                    <Touchable
                        onPress={() =>
                            this.props.navigation.navigate('WebView', {
                                url: TERMS_OF_USE_URL
                            })
                        }
                    >
                        <T color="GreyM">Terms of Use</T>
                    </Touchable>
                    <Touchable
                        onPress={() =>
                            this.props.navigation.navigate('WebView', {
                                url: PRIVACY_POLICY_URL
                            })
                        }
                    >
                        <T color="GreyM">Privacy Policy</T>
                    </Touchable>
                </Section>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    divider: {
        width: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.GreyL,
        opacity: 0.4
    }
})

export default SettingsScreen
