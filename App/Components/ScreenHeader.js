// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'Themes/Metrics'
import T from 'Components/T'
import V from 'Components/V'
import Section from 'Components/Section'

const ScreenHeader = ({ navigation, titleLeft, titleRight, renderRightHeader }) => {
    // const renderBackButton = navigation.state.routes.length > 1
    return (
        <Section>
            <V row style={styles.headerStyle} mx={2}>
                <T titleXL color="GreyXL">
                    {titleLeft}
                </T>
                <T titleXL color="GreyM">
                    {titleRight}
                </T>
                <V pabs style={{ right: 0, top: 0, bottom: 0 }} jc="center">
                    {renderRightHeader && renderRightHeader()}
                </V>
            </V>
        </Section>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        marginTop: getStatusBarHeight()
    }
})

export default ScreenHeader
