// @flow
import React from 'react'
import { Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { withNavigation } from 'react-navigation'
import TouchableCard from 'Components/TouchableCard'
import { FEEDBACK_URL } from 'Data/urls'

class FeedbackButton extends React.Component<*> {
    render() {
        return (
            <TouchableCard
                bg="WhiteM"
                px={3}
                py={2}
                my={1}
                onPress={() => this.props.navigation.navigate('WebView', { url: FEEDBACK_URL })}
            >
                <V row py={1} ai="center">
                    <EntypoIcon name="megaphone" size={30} color={Colors.BrandM} />
                    <V flex={8} pl={2}>
                        <T color="BrandM" heading emphasis>
                            Give us feedback!
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

export default withNavigation(FeedbackButton)
