// @flow
import React from 'react'
import { Image } from 'react-native'
import { Images, Colors } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Card from 'MellowComponents/Card'

const DailyReflectionCompletedCard = ({ streak }) => {
    return (
        <Card bg="WhiteM" style={{ width: '100%' }} mb={3}>
            <Image
                source={Images.cardWaveF}
                style={{
                    width: '100%',
                    tintColor: Colors.PastelGold
                }}
            />
            <V p={3} px={4}>
                <V row pb={1} ai="center" jc="space-between">
                    <V row ai="center">
                        <T style={{ fontSize: 48 }} pr={2}>
                            {streak}
                        </T>
                        <V pr={3}>
                            <T subtitle1>day</T>
                            <T subtitle1>streak</T>
                        </V>
                    </V>
                    <T style={{ fontSize: 48 }}>🏅</T>
                </V>
                <T subtitle1 color="Gray1" pt={2}>
                    All done for today!
                </T>
            </V>
        </Card>
    )
}

export default DailyReflectionCompletedCard
