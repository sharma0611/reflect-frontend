// @flow
import * as React from 'react'
import { StyleSheet, Image } from 'react-native'
import { AppStyles, Images, Metrics } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'

type Props = {
    boat: boolean,
    heightRatio: number,
    fullScreen: boolean
}

type State = {}

class WaveBackground extends React.Component<Props, State> {
    render() {
        const { boat, heightRatio, fullScreen } = this.props
        const glyph = boat ? Images.waveBoatGlyph : Images.waveGlyph
        return (
            <V
                style={
                    fullScreen ? AppStyles.fullScreenContainer : AppStyles.fullSafeScreenContainer
                }
                bg="BabyBlueL"
            >
                <V pabs style={{ height: Metrics.screenHeight }}>
                    <V flex={1} />
                    <V style={{ height: Metrics.screenHeight * heightRatio }}>
                        <Image style={styles.waveBoatGlyph} source={glyph} />
                        <V bg="BabyBlueM" flex={1} />
                    </V>
                </V>
                {this.props.children}
            </V>
        )
    }
}

const styles = StyleSheet.create({})

export default WaveBackground
