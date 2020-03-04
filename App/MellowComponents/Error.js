import React from 'react'
import T from 'Components/T'
import V from 'Components/V'
import FixedWaveBackground from 'MellowComponents/FixedWaveBackground'
import MainButton from 'MellowComponents/SecondaryButton'
import Card from './Card'

const Error = ({ error }) => (
    <FixedWaveBackground>
        <V p={4} flex={1} jc="center">
            <Card alt bg="WhiteM">
                <V p={3}>
                    <V pb={2}>
                        <T heading4>Ooops! 🤐</T>
                    </V>
                    <V pb={2}>
                        <T color="">The following error has occured: </T>
                    </V>
                    <T color="Red1">{error}</T>
                    <V ai="center" pt={3}>
                        <MainButton text={'Report this bug! 🐛'} />
                    </V>
                </V>
            </Card>
        </V>
    </FixedWaveBackground>
)

export default Error
