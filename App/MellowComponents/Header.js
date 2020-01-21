// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
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
        const { headerTitle, goBack, exit, onClose } = this.props
        return (
            <V
                pabs
                bg="PastelPurple"
                style={{
                    height: HEADER_HEIGHT,
                    width: Metrics.screenWidth,
                    paddingTop: Metrics.statusBarHeight,
                    ...AppStyles.dropShadow.normal
                }}
                jc="center"
            >
                <V jc="center">
                    <T heading4 ta="center" color="WhiteM">
                        {headerTitle}
                    </T>
                    {goBack && (
                        <V pabs pl={3}>
                            <LeftChevron tintColor="WhiteM" />
                        </V>
                    )}
                    {exit && (
                        <V pabs pr={4} style={{ right: 0 }}>
                            <PressableImage
                                source={Images.cross}
                                style={{ tintColor: Colors.WhiteM }}
                                onPress={() => {
                                    onClose ? onClose() : this.props.navigation.navigate('Tabs')
                                }}
                            />
                        </V>
                    )}
                </V>
            </V>
        )
    }
}

const styles = StyleSheet.create({})

export default withNavigation(Header)
