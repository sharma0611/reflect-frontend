// @flow
import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Metrics, Images } from 'Themes'

type Props = {
    tintColor: string
}

type State = {}
class PencilIcon extends React.Component<Props, State> {
    render() {
        return (
            <Image
                source={Images.pencil}
                style={{ ...styles.pencil, tintColor: this.props.tintColor }}
            />
        )
    }
}

const styles = StyleSheet.create({
    pencil: {
        height: Metrics.icons.small,
        width: Metrics.icons.small
    }
})

export default PencilIcon
