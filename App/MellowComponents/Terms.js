// @flow
import * as React from 'react'
import { withNavigation } from 'react-navigation'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from 'Data/urls'

const Terms = ({ navigation }) => {
    return (
        <>
            <Touchable
                onPress={() =>
                    navigation.navigate('LoggedOutWebView', {
                        url: TERMS_OF_USE_URL
                    })
                }
            >
                <T py={1} ta="center" tiny color="Gray3">
                    Terms of Use
                </T>
            </Touchable>
            <Touchable
                onPress={() =>
                    navigation.navigate('LoggedOutWebView', {
                        url: PRIVACY_POLICY_URL
                    })
                }
            >
                <T py={1} ta="center" tiny color="Gray3">
                    Privacy Policy
                </T>
            </Touchable>
        </>
    )
}

export default withNavigation(Terms)
