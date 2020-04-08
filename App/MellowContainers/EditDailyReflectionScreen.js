import React, { useState, useEffect } from 'react'
import { Images, Metrics, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import WaveBackground from 'MellowComponents/WaveBackground'
import LeftChevron from 'MellowComponents/LeftChevron'
import { withNavigation } from 'react-navigation'
import Card from 'MellowComponents/Card'
import ActivityResponse from 'Firebase/models/ActivityResponse'

const CIRCLE_SIZE = 10

const Row = ({ leftDotColor, title, onPress }) => {
    return (
        <V p={2} row ai="center" jc="center">
            <V px={2}>
                <V
                    bg={leftDotColor}
                    style={{
                        height: CIRCLE_SIZE,
                        width: CIRCLE_SIZE,
                        borderRadius: CIRCLE_SIZE / 2
                    }}
                />
            </V>
            <T b1 color="Gray2">
                {title}
            </T>
            <V flex={1} />
            <V px={2}>
                {/* <Image
                    source={Images.smallRightChevron}
                    style={{ height: 12, width: 12, resizeMode: 'contain' }}
                /> */}
            </V>
        </V>
    )
}

const Seperator = () => {
    return (
        <V flex={1} ai="center">
            <V
                style={{
                    width: Metrics.screenWidth - 5 * Metrics.padding.scale[3],
                    borderBottomWidth: 0.7,
                    opacity: 0.3,
                    borderBottomColor: Colors.Gray4
                }}
            />
        </V>
    )
}

const EditDailyReflectionScreen = ({ navigation }) => {
    // const schemaOptions = ActivityResponse.defaultReflectionSchema()
    return (
        <WaveBackground>
            <V p={4}>
                <LeftChevron />
            </V>
            <V p={4} pt={0}>
                <T heading3 color="Gray1" pb={3}>
                    Customize your reflection
                </T>
                <Card alt bg="WhiteM">
                    <V p={1} py={2}>
                        <V py={1}>
                            <Row {...{ leftDotColor: 'PastelPurple' }} />
                        </V>
                    </V>
                </Card>
            </V>
        </WaveBackground>
    )
}

export default withNavigation(EditDailyReflectionScreen)
