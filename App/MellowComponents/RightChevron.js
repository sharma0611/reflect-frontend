// @flow
import * as React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Images, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Touchable from 'Components/Touchable'

type Props = {
    tintColor: string,
    onPress: any
}

type State = {}

class RightChevron extends React.Component<Props, State> {
    render() {
        const tintColorName = this.props.tintColor ? this.props.tintColor : 'Gray2'
        const tintColor = Colors.getColor(tintColorName)
        return (
            <Touchable onPress={this.props.onPress}>
                <Image
                    source={Images.leftChevron}
                    style={{ tintColor, transform: [{ rotate: '180deg' }] }}
                />
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({})

export default RightChevron