// @flow
import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Metrics, Colors, Images } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Section from 'MellowComponents/Section'
import SectionHeader from 'MellowComponents/SectionHeader'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import ProfileCard from '../MellowModules/ProfileCard'
import MissionCard from '../MellowModules/MissionCard'
import Loading from '../MellowComponents/Loading'
import ErrorScreen from '../MellowContainers/ErrorScreen'
import useProfile from '../Hooks/useProfile'

const MellowPaywall = () => {
    return (
        <ScrollingScreen>
            <V ai="center" jc="center" flex={1}>
                <V>
                    <V style={styles.logoBar} row jc="flex-end" ai="center">
                        <V>
                            <T heading1 color="Gray2">
                                reflect
                            </T>
                            <T subtitle1 color="Gray2">
                                premium
                            </T>
                        </V>
                        <V pl={2}>
                            <Image style={styles.logo} source={Images.logo} />
                        </V>
                    </V>
                </V>
            </V>
        </ScrollingScreen>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        tintColor: Colors.Blue2
    },
    logoBar: {
        height: 80
    },
    waveBoatGlyph: {
        width: Metrics.screenWidth
    }
})

MellowPaywall.navigationOptions = {
    header: null
}

export default MellowPaywall
