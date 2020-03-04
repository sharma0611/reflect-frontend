import React from 'react'
import T from 'Components/T'
import V from 'Components/V'
import FixedWaveBackground from 'MellowComponents/FixedWaveBackground'
import MainButton from 'MellowComponents/SecondaryButton'
import Card from '../MellowComponents/Card'
import { withNavigation } from 'react-navigation'
import { BUGFORM_URL } from 'Data/urls'

const ErrorScreen = ({ error, navigation }) => {
    const navigateToBugForm = () => {
        navigation.navigate('WebView', { url: BUGFORM_URL })
    }

    return (
        <FixedWaveBackground>
            <V p={4} flex={1} jc="center">
                <Card alt bg="WhiteM">
                    <V p={3}>
                        <V pb={2}>
                            <T heading4>Ooops! 🤐</T>
                        </V>
                        <V pb={2}>
                            <T>The following error has occured: </T>
                        </V>
                        <T color="Red1">{error}</T>
                        <V ai="center" pt={3}>
                            <MainButton onPress={navigateToBugForm} text={'Report this bug! 🐛'} />
                        </V>
                    </V>
                </Card>
            </V>
        </FixedWaveBackground>
    )
}

export default withNavigation(ErrorScreen)
