//@flow
import * as React from 'react'
import V from 'Components/V'
import T from 'Components/T'
import WaveBackground from 'MellowComponents/WaveBackground'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import Profile from 'Firebase/models/Profile'
import PinInput from 'MellowComponents/PinInput'
import { usePin } from 'Hooks/useUser'

const Pin = ({ login }) => {
    const [pinGuess, setPinGuess] = React.useState('')
    const [{ isProtected }, setPin, unsetPin, checkPin] = usePin()
    const pinRef = React.useRef(null)

    const checkPinGuess = currPinGuess => {
        const success = checkPin(currPinGuess)
        if (success) {
            login()
        } else {
            pinRef.current.shake()
            setPinGuess('')
        }
    }

    const logoutAndUnset = () => {
        Profile.signOut()
        unsetPin()
    }

    return (
        <WaveBackground>
            <V p={4} pb={6} pt={6}>
                <T heading3 color="Gray1">
                    Enter your pin
                </T>
            </V>
            <PinInput
                {...{ pin: pinGuess, setPin: setPinGuess, pinRef, onFulfill: checkPinGuess }}
            />
            <V p={4} pt={6}>
                <T>Forgot your pin? Just logout and unset your pin below.</T>
            </V>
            <V ai="center">
                <SecondaryButton text="Logout and Unset Pin" onPress={logoutAndUnset} />
            </V>
        </WaveBackground>
    )
}

export default Pin
