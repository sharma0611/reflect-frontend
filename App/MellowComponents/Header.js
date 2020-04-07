// @flow
import * as React from 'react'
import { AppStyles, Metrics, Colors, Images } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import LeftChevron from 'MellowComponents/LeftChevron'
import PressableImage from 'Components/PressableImage'
import { withNavigation } from 'react-navigation'

type Props = {
    headerTitle: string,
    goBack?: boolean,
    exit?: boolean
}

type State = {}

export const HEADER_HEIGHT = Metrics.statusBarHeight + 70

class Header extends React.Component<Props, State> {
    render() {
        const { headerTitle, goBack, exit, onClose, color, LeftIcon } = this.props
        return (
            <V
                pabs
                style={{
                    height: HEADER_HEIGHT,
                    left: 0,
                    right: 0,
                    paddingTop: Metrics.statusBarHeight,
                    ...{ backgroundColor: color ? color : Colors.PastelPurple },
                    ...AppStyles.dropShadow.normal
                }}
                jc="center"
            >
                <V jc="center">
                    <T heading4 ta="center" color="WhiteM">
                        {headerTitle}
                    </T>
                    {!!LeftIcon && (
                        <V pl={3} pabs>
                            <LeftIcon />
                        </V>
                    )}
                    {goBack && (
                        <V pabs pl={3}>
                            <LeftChevron tintColor="WhiteM" />
                        </V>
                    )}
                    {exit && (
                        <V pabs pr={3} style={{ right: 0 }}>
                            <PressableImage
                                source={Images.exit}
                                style={{ tintColor: Colors.WhiteM, height: 30, width: 30 }}
                                onPress={() => {
                                    if (onClose) {
                                        onClose()
                                    } else {
                                        this.props.navigation.goBack('Tabs')
                                    }
                                }}
                            />
                        </V>
                    )}
                </V>
            </V>
        )
    }
}

export default withNavigation(Header)
