//@flow
import * as React from 'react'
import { withNavigation } from 'react-navigation'
import V from 'Components/V'
import T from 'Components/T'
import MainButton from 'MellowComponents/MainButton'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import WaveBackground from 'MellowComponents/WaveBackground'
import LeftChevron from 'MellowComponents/LeftChevron'
import Profile from 'Firebase/models/Profile'
import PinInput from 'MellowComponents/PinInput'
import { usePin } from 'Hooks/useUser'

const SetPin = ({ navigation }) => {
    const [{}, setGlobalPin] = usePin()
    const [pin, setLocalPin] = React.useState('')
    const pinRef = React.useRef(null)

    const submitPin = async () => {
        await Profile.updatePin(pin)
        setGlobalPin(pin)
        await navigation.goBack()
    }

    const unsetPin = async () => {
        await Profile.unsetPin()
        await navigation.goBack()
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
            <PinInput {...{ pin, setPin: setLocalPin, pinRef }} />
            <V ai="center" pt={5}>
                <MainButton text="Set Pin" disabled={pin.length !== 4} onPress={submitPin} />
            </V>
            <V ai="center" pt={2}>
                <SecondaryButton text="Unset Pin" onPress={unsetPin} />
            </V>
        </WaveBackground>
    )
}

export default withNavigation(SetPin)
