// @flow
import * as React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Images, Metrics } from 'Themes'
import V from 'Components/V'
import BlueBackground from 'MellowComponents/BlueBackground'

type Props = {
    boat: boolean,
    heightRatio: number,
    fullScreen: boolean
}

type State = {}

class WaveBackground extends React.Component<Props, State> {
    render() {
        const { boat, heightRatio, fullScreen, children } = this.props
        const glyph = boat ? Images.waveBoatGlyph : Images.waveGlyph
        return (
            <BlueBackground {...{ fullScreen }}>
                <V pabs style={StyleSheet.absoluteFill}>
                    <V flex={1} />
                    <V style={{ height: Metrics.screenHeight * heightRatio }}>
                        <Image source={glyph} />
                        <V bg="BabyBlueM" flex={1} />
                    </V>
                </V>
                {children}
            </BlueBackground>
        )
    }
}

export default WaveBackground
