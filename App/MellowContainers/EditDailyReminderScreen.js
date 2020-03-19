import React, { useState } from 'react'
import T from 'Components/T'
import V from 'Components/V'
import MainButton from 'MellowComponents/MainButton'
import WaveBackground from 'MellowComponents/WaveBackground'
import LeftChevron from 'MellowComponents/LeftChevron'
import { withNavigation } from 'react-navigation'
import DateTimePicker from '@react-native-community/datetimepicker'
import Me from 'Apollo/queries/me'
import updateUserReflectionTime from 'Apollo/mutations/updateUserReflectionTimeMutation'
import { localToUtcTime, utcToLocalTime } from 'utils'
import AppConfig from 'Config/AppConfig'
import ErrorScreen from './ErrorScreen'
import Card from 'MellowComponents/Card'
import LoadingSpinner from 'Components/LoadingSpinner'
import { Appearance } from 'react-native-appearance'
import { Platform } from 'react-native'

const EditDailyReminderScreen = ({ navigation }) => {
    const [{ reflectionTimeHour, reflectionTimeMin, reflectionTime }, setTime] = useState({})
    const [showTimePicker, setShowTimePicker] = useState(true)

    const onSubmit = async () => {
        await submitTime()
        navigation.goBack()
    }

    const onChange = async (event, selectedTime) => {
        if (Platform.OS === 'android' && selectedTime === undefined) {
            navigation.goBack()
        } else if (Platform.OS === 'android') {
            const hour = selectedTime.getHours()
            const min = selectedTime.getMinutes()
            const { hours: utcHours, minutes: utcMinutes } = localToUtcTime(hour, min)
            setShowTimePicker(false)
            await updateUserReflectionTime(AppConfig.DEVICE_ID, utcHours, utcMinutes)
            navigation.goBack()
        } else {
            const hour = selectedTime.getHours()
            const min = selectedTime.getMinutes()
            setTime({
                reflectionTimeHour: hour,
                reflectionTimeMin: min,
                reflectionTime: selectedTime
            })
        }
    }

    const submitTime = async () => {
        const { hours: utcHours, minutes: utcMinutes } = localToUtcTime(
            reflectionTimeHour,
            reflectionTimeMin
        )
        await updateUserReflectionTime(AppConfig.DEVICE_ID, utcHours, utcMinutes)
        // Analytics.setDailyReflectionReminder()
    }

    const getLocalTimeFromData = data => {
        const {
            me: {
                reflectionPush: { reflectionTimeHour: hour, reflectionTimeMin: min }
            }
        } = data
        const { hours, minutes } = utcToLocalTime(hour, min)
        return { hours, minutes }
    }

    const setReflectionTime = data => {
        const { hours, minutes } = getLocalTimeFromData(data)
        setTime({ reflectionTimeHour: hours, reflectionTimeMin: minutes })
    }

    const colorScheme = Appearance.getColorScheme()
    const darkMode = colorScheme === 'dark'
    let cardBg = 'WhiteM'
    if (darkMode) {
        cardBg = 'BlackM'
    }
    return (
        <WaveBackground>
            <V p={4}>
                <LeftChevron />
            </V>
            <Me
                deviceId={AppConfig.DEVICE_ID}
                onCompleted={data => setReflectionTime(data)}
                // onError={error => setErrorState()}
            >
                {({ loading, error, data }) => {
                    if (loading) return <LoadingSpinner />
                    if (error) return <ErrorScreen {...{ error }} />
                    let time = new Date()
                    const { hours, minutes } = getLocalTimeFromData(data)
                    time.setHours(hours)
                    time.setMinutes(minutes)
                    const value = reflectionTime ? reflectionTime : time
                    return (
                        <>
                            <V p={4} pt={0}>
                                <T heading4 color="Gray1" pt={4}>
                                    Set your reminder time!
                                </T>
                                <Card mt={4} alt bg={cardBg}>
                                    {showTimePicker && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={value}
                                            mode={'time'}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                </Card>
                            </V>
                            {/* <V ai="center">
                                <T h5>Selected time: {moment(value).format('hh:mm a')}</T>
                            </V> */}
                            <V ai="center" pt={2}>
                                <MainButton onPress={onSubmit} text={`Set time`} />
                            </V>
                        </>
                    )
                }}
            </Me>
        </WaveBackground>
    )
}

export default withNavigation(EditDailyReminderScreen)
