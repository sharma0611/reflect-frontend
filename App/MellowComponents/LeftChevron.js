// @flow
import * as React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Images } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Touchable from 'Components/Touchable'
import { withNavigation } from 'react-navigation'

type Props = {}

type State = {}

class LeftChevron extends React.Component<Props, State> {
    render() {
        return (
            <Touchable onPress={() => this.props.navigation.goBack()}>
                <Image source={Images.leftChevron} />
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({})

export default withNavigation(LeftChevron)
