// @flow
import * as React from 'react'
import { AppStyles } from 'Themes'
import V from 'Components/V'

type Props = {
    fullScreen: boolean
}

type State = {}

class BlueBackground extends React.Component<Props, State> {
    render() {
        const { fullScreen, children, style, ...rest } = this.props
        return (
            <V
                style={[
                    fullScreen ? AppStyles.fullScreenContainer : AppStyles.fullSafeScreenContainer,
                    style
                ]}
                bg="BabyBlueL"
                {...rest}
            >
                {children}
            </V>
        )
    }
}

export default BlueBackground
