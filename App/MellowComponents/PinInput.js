//@flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { AppStyles, Colors } from 'Themes'
import V from 'Components/V'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'

type Props = {
    pin: string,
    setPin: (pin: string) => void,
    onFulfill: () => void,
    pinRef: any
}

const PinInput = ({ pin, setPin, onFulfill, pinRef }: Props) => {
    return (
        <V ai="center">
            <SmoothPinCodeInput
                ref={pinRef}
                value={pin}
                autoFocus={true}
                restrictToNumbers={true}
                onTextChange={pin => setPin(pin)}
                onFulfill={onFulfill}
                cellStyle={styles.cell}
                cellSpacing={10}
                animationFocused={null}
                cellStyleFocused={{
                    height: 60,
                    width: 60
                }}
                textStyle={{
                    fontSize: 24,
                    color: Colors.BlackM
                }}
            />
        </V>
    )
}

const styles = StyleSheet.create({
    cell: {
        ...AppStyles.dropShadow.big,
        backgroundColor: Colors.WhiteM,
        borderRadius: 10
    }
})

export default PinInput
