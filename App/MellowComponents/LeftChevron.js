// @flow
import * as React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Images, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Touchable from 'Components/Touchable'
import { withNavigation } from 'react-navigation'

type Props = {
    tintColor: string
}

type State = {}

class LeftChevron extends React.Component<Props, State> {
    render() {
        const tintColorName = this.props.tintColor ? this.props.tintColor : 'Gray2'
        const tintColor = Colors.getColor(tintColorName)
        return (
            <Touchable onPress={() => this.props.navigation.goBack(null)}>
                <Image source={Images.leftChevron} style={{ tintColor }} />
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({})

export default withNavigation(LeftChevron)
