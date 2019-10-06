// @flow
import * as React from 'react'
import Card from 'Components/Card'
import Touchable from 'Components/Touchable'

type Props = {
    onPress: Function,
    children: React.ReactNode
}

type State = {}

class TouchableCard extends React.Component<Props, State> {
    render() {
        const { onPress, children, containerStyle, ...rest } = this.props
        return (
            <Touchable {...{ onPress }} style={containerStyle}>
                <Card {...rest}>{children}</Card>
            </Touchable>
        )
    }
}
export default TouchableCard
