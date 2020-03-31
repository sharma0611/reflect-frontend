//@flow
import * as React from 'react'
import V from 'Components/V'
import T from 'Components/T'
import WaveBackground from 'MellowComponents/WaveBackground'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import Profile from 'Firebase/models/Profile'
import PinInput from 'MellowComponents/PinInput'

const Pin = ({ login, pin: correctPin }) => {
    const [pin, setPin] = React.useState('')
    const pinRef = React.useRef(null)

    const checkPin = async pin => {
        let success
        if (correctPin) {
            success = correctPin === pin
        } else {
            success = await Profile.checkPin(pin)
        }
        if (success) {
            login()
        } else {
            pinRef.current.shake()
            setPin('')
        }
    }

    const logoutAndUnset = async () => {
        await Profile.unsetPin()
        Profile.signOut()
    }

    return (
        <WaveBackground>
            <V p={4} pb={6} pt={6}>
                <T heading3 color="Gray1">
                    Enter your pin
                </T>
            </V>
            <PinInput {...{ pin, setPin, pinRef, onFulfill: checkPin }} />
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
