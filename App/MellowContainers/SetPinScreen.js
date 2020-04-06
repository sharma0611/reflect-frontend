//@flow
import * as React from 'react'
import { withNavigation } from 'react-navigation'
import V from 'Components/V'
import T from 'Components/T'
import MainButton from 'MellowComponents/MainButton'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import WaveBackground from 'MellowComponents/WaveBackground'
import LeftChevron from 'MellowComponents/LeftChevron'
import PinInput from 'MellowComponents/PinInput'
import { usePin } from 'Hooks/useProfile'

const SetPin = ({ navigation }) => {
    const [{ isProtected }, setPin, unsetPin, checkPin] = usePin()
    const [newPin, setNewPin] = React.useState('')
    const pinRef = React.useRef(null)

    const submitPin = async () => {
        await setPin(newPin)
        navigation.goBack()
    }

    const resetPin = async () => {
        await unsetPin()
        navigation.goBack()
    }

    return (
        <WaveBackground>
            <V p={4}>
                <LeftChevron />
            </V>
            <V p={4} pt={0} pb={5}>
                <T heading3 color="Gray1">
                    Set your pin
                </T>
            </V>
            <PinInput {...{ pin: newPin, setPin: setNewPin, pinRef }} />
            <V ai="center" pt={5}>
                <MainButton
                    text="Set Pin"
                    disabled={newPin.length !== 4}
                    onPress={submitPin}
                    onePress
                />
            </V>
            <V ai="center" pt={2}>
                <SecondaryButton text="Unset Pin" onPress={resetPin} />
            </V>
        </WaveBackground>
    )
}

export default withNavigation(SetPin)
