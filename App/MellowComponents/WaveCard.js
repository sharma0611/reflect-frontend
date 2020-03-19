// @flow
import React from 'react'
import { Image } from 'react-native'
import { Images, Colors } from 'Themes'
import Card from 'MellowComponents/Card'

const WaveCard = ({ tintColor, children, ...rest }) => {
    return (
        <Card bg="WhiteM" {...rest}>
            <Image
                source={Images.cardWaveF}
                style={{
                    width: '100%',
                    tintColor: tintColor ? tintColor : Colors.PastelPurple
                }}
            />
            {children}
        </Card>
    )
}

export default WaveCard
