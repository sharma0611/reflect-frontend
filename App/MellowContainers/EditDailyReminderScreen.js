import React, { useState } from 'react'
import T from 'Components/T'
import V from 'Components/V'
import MainButton from 'MellowComponents/MainButton'
import WaveBackground from 'MellowComponents/WaveBackground'
import LeftChevron from 'MellowComponents/LeftChevron'
import { withNavigation } from 'react-navigation'
import DateTimePicker from '@react-native-community/datetimepicker'

const EditDailyReminderScreen = ({ navigation }) => {
    const [time, setTime] = useState(new Date(1598051730000))
    const onChange = (event, selectedTime) => {
        const currentTime = selectedTime || time
        setTime(currentTime)
    }

    const onSubmit = () => {
        console.log(`👨‍🌾 => `, time)
        navigation.goBack()
    }

    return (
        <WaveBackground>
            <V p={4}>
                <LeftChevron />
            </V>
            <V p={4} pt={0}>
                <T heading4 color="Gray1" pt={4}>
                    Set your reminder time!
                </T>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={time}
                    mode={'time'}
                    display="default"
                    onChange={onChange}
                />
            </V>
            <V ai="center" pt={2}>
                <MainButton onPress={onSubmit} text={`Set time`} />
            </V>
        </WaveBackground>
    )
}

export default withNavigation(EditDailyReminderScreen)
