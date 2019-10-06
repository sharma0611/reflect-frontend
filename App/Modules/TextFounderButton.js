// @flow
import React from 'react'
import { Linking } from 'react-native'
import { Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import TouchableCard from 'Components/TouchableCard'
import { withNavigation } from 'react-navigation'
import FAIcon from 'react-native-vector-icons/FontAwesome'

const FEEDBACK_TEXT = `Hey Shivam,
I’m a Reflect user and I think this app would be better if... 
My favorite part of the app is...
My least favorite part of the app is... 
`
const MESSAGING_URL = `sms:+16479380024&body=${encodeURIComponent(FEEDBACK_TEXT)}`

class TextFounderButton extends React.Component<*> {
    render() {
        return (
            <TouchableCard
                bg="WhiteM"
                px={3}
                py={2}
                my={1}
                onPress={() => Linking.openURL(MESSAGING_URL)}
            >
                <V row py={1} ai="center">
                    <FAIcon name="comments" size={30} color={Colors.BrandM} />
                    <V flex={8} pl={2}>
                        <T color="BrandM" heading emphasis>
                            Text the founder!
                        </T>
                    </V>
                    <V flex={1}>
                        <T ta="right" color="BrandM" heading>
                            >
                        </T>
                    </V>
                </V>
            </TouchableCard>
        )
    }
}

export default withNavigation(TextFounderButton)
