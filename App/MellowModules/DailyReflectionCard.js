// @flow
import React from 'react'
import Card from 'MellowComponents/Card'
import { Image } from 'react-native'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'
import { Images } from 'Themes'
import { withNavigation } from 'react-navigation'

const DailyReflectionCard = ({ navigation, dailyReflection }) => {
    const navigateToDailyReflection = () => {
        navigation.navigate('Activity', {
            activity: dailyReflection,
            index: 0
        })
    }

    return (
        <Touchable onPress={navigateToDailyReflection}>
            <Card bg="PastelPurple" style={{ width: '100%' }} mb={3}>
                <V ai="flex-end" pt={3} pb={3} pr={5}>
                    <V style={{ width: 60, height: 35 }}>
                        <V pabs style={{ bottom: 0, left: 0 }}>
                            <Image
                                source={Images.cloudA}
                                style={{ width: 40, height: 30, resizeMode: 'contain' }}
                            />
                        </V>
                        <V pabs style={{ top: 0, right: 0 }}>
                            <Image
                                source={Images.moon}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                        </V>
                    </V>
                </V>
                <Image source={Images.cardWaveGlyphA} style={{ width: '100%' }} />
                <V
                    pl={4}
                    pb={3}
                    pr={4}
                    bg="WhiteM"
                    style={{
                        borderBottomRightRadius: 30,
                        borderBottomLeftRadius: 10
                    }}
                >
                    <V>
                        <T subtitle1>Start my</T>
                        <T heading4 color="Gray1">
                            Daily Reflection
                        </T>
                        <V
                            pabs
                            style={{
                                right: 0,
                                bottom: 10
                            }}
                        >
                            <Image
                                source={Images.playButton}
                                style={{ width: 40, resizeMode: 'contain' }}
                            />
                        </V>
                    </V>
                </V>
            </Card>
        </Touchable>
    )
}

export default withNavigation(DailyReflectionCard)
