// @flow
import * as React from 'react'
import { StyleSheet, TextInput, Image, ScrollView } from 'react-native'
import { AppStyles, Metrics, Colors, Images, Fonts } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import MainButton from 'MellowComponents/MainButton'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import WaveBackground from 'MellowComponents/WaveBackground'
import LeftChevron from 'MellowComponents/LeftChevron'
import Card from 'MellowComponents/Card'
import { withNavigation } from 'react-navigation'
import userExposedToContainer from 'State/userExposedTo'
import Touchable from 'Components/Touchable'
import Analytics from 'Controllers/AnalyticsController'
import BlueBackground from 'MellowComponents/BlueBackground'
import { Formik } from 'formik'

type Props = {}

type State = {
    name: string
}

const CATEGORY_MARGIN = 3
const CATEGORY_CARD_WIDTH = Metrics.screenWidth * 0.5
const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + Metrics.padding.scale[CATEGORY_MARGIN]

const CATEGORIES = [
    { name: 'My dream physique' },
    { name: 'Strong financial freedom' },
    { name: 'The peak of my career' },
    { name: 'Making my family happy and proud' },
    { name: 'Helping as many people as I can' },
    { name: 'Having a high growth mindset' }
]

const CIRCLE_WIDTH = 30

class CreateAccount extends React.Component<Props, State> {
    submit = formData => {
        console.log(`👨‍🌾 => `, formData)
        // this.finishOnboarding()
        Analytics.submitLifeGoals(this.state.lifeGoals)
    }

    finishOnboarding() {
        userExposedToContainer.onExposedToOnboarding()
    }

    render() {
        return (
            <BlueBackground>
                <V p={4}>
                    <LeftChevron />
                </V>
                <V p={4} pt={0}>
                    <T heading3 color="Gray1">
                        One last thing!
                    </T>
                    <T b1 color="Gray1" pt={4}>
                        Backup your entries, see your progress, and encrypt your data with an
                        account.
                    </T>
                </V>
                <V flex={1} bg="WhiteM" style={styles.whiteContainer} p={5}>
                    <T heading4 color="Gray1">
                        Create your account
                    </T>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={values => this.submit(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <V>
                                <V row>
                                    <Image
                                        source={Images.mail}
                                        resizeMode="contain"
                                        style={styles.fieldIcon}
                                    />
                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                </V>
                                <TextInput
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.email}
                                />
                                <V ai="center" pt={6}>
                                    <MainButton
                                        disabled={this.state.lifeGoals.length === 0}
                                        onPress={handleSubmit}
                                        text={'Sign Up'}
                                    />
                                </V>
                            </V>
                        )}
                    </Formik>
                </V>
            </BlueBackground>
        )
    }
}

const styles = StyleSheet.create({
    whiteContainer: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    fieldIcon: {
        height: '100%'
    }
})

export default withNavigation(CreateAccount)
