// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { AppStyles, Metrics } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import LeftChevron from 'MellowComponents/LeftChevron'

type Props = {
    headerTitle: string
}

type State = {}

export const HEADER_HEIGHT = Metrics.statusBarHeight + 70

class Header extends React.Component<Props, State> {
    render() {
        const { headerTitle } = this.props
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
                <V>
                    <T heading4 ta="center" color="WhiteM">
                        {headerTitle}
                    </T>
                    <V pabs pl={3}>
                        <LeftChevron tintColor="WhiteM" />
                    </V>
                </V>
            </V>
        )
    }
}

const styles = StyleSheet.create({})

export default Header
