// @flow
import React from 'react'
import { Image } from 'react-native'
import { Images, Colors } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Card from 'MellowComponents/Card'

const DailyReflectionCompletedCard = ({ streak }) => {
    return (
        <Card bg="WhiteM" style={{ width: '100%' }}>
            <Image
                source={Images.cardWaveF}
                style={{
                    width: '100%',
                    tintColor: Colors.PastelGold
                }}
            />
            <V p={3}>
                <V row pb={1} ai="center">
                    <T style={{ fontSize: 48 }} pr={2}>
                        🏅
                    </T>
                    <T style={{ fontSize: 48 }} pr={2}>
                        {streak}
                    </T>
                    <V>
                        <T subtitle1>day</T>
                        <T subtitle1>streak</T>
                    </V>
                </V>
                <T b1 color="Gray1" ta="right">
                    All done for today!
                </T>
            </V>
        </Card>
    )
}

export default DailyReflectionCompletedCard
