// @flow
import React from 'react'
import { StyleSheet, TextInput, ScrollView, Image } from 'react-native'
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
import Touchable from 'Components/Touchable'
import Analytics from 'Controllers/AnalyticsController'
import BlueBackground from 'MellowComponents/BlueBackground'
import { Formik } from 'formik'
import FIcon from 'react-native-vector-icons/Feather'
import {
    signInWithEmailAndPassword,
    signInWithFacebookCredential,
    signInWithGoogleCredential
} from '../Controllers/FirebaseController'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from '@react-native-community/google-signin'

type Props = {}

type State = {}

const FieldIcon = ({ icon }) => {
    return <FIcon name={icon} size={20} color={Colors.Gray4} />
}

const Field = ({ LeftIcon, RightIcon, onChangeText, onBlur, value, ...rest }) => {
    return (
        <V row style={styles.fieldContainer}>
            {LeftIcon && <V p={2}>{LeftIcon}</V>}
            <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                autoCorrect={false}
                {...{
                    onChangeText,
                    onBlur,
                    value,
                    ...rest
                }}
            />
            {RightIcon && <V p={2}>{RightIcon}</V>}
        </V>
    )
}

class SignIn extends React.Component<Props, State> {
    state = {
        showPassword: false,
        error: ''
    }

    submit = async formData => {
        const { email, password } = formData
        try {
            await this.setState({ error: '' })
            await signInWithEmailAndPassword({ email, password })
        } catch (e) {
            await this.setState({ error: e.message })
        }
    }

    toggleShowPassword = () => {
        this.setState(prevState => ({ showPassword: !prevState.showPassword }))
    }

    fbSignIn = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

        if (result.isCancelled) {
            // throw new Error('Error: login cancelled')
            this.setState({ error: 'Error: Login Cancelled.' })
        } else {
            const { accessToken } = await AccessToken.getCurrentAccessToken()

            if (!accessToken) {
                // throw new Error('Something went wrong obtaining access token')
                this.setState({ error: 'Error: Something went wrong getting the access token.' })
            }

            await signInWithFacebookCredential({ accessToken })
        }
    }

    googleSignIn = async () => {
        const { accessToken, idToken } = await GoogleSignin.signIn()
        await signInWithGoogleCredential({ idToken, accessToken })
    }

    forgotPassword = () => {
        this.props.navigation.navigate('ResetPassword')
    }

    render() {
        return (
            <BlueBackground>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                    <V p={4}>
                        <LeftChevron />
                    </V>
                    <V p={4} pt={0} ai="center">
                        <T heading3 color="Gray1">
                            Welcome back!
                        </T>
                    </V>
                    <V flex={1} bg="WhiteM" style={styles.whiteContainer}>
                        <V p={5}>
                            <T heading4 color="Gray1">
                                Please sign in
                            </T>
                            <V pt={5}>
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    onSubmit={values => this.submit(values)}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                                        <V>
                                            <V pb={2}>
                                                <Field
                                                    LeftIcon={<FieldIcon icon="mail" />}
                                                    onChangeText={handleChange('email')}
                                                    onBlur={handleBlur('email')}
                                                    value={values.email}
                                                    autoCompleteType="email"
                                                    autoFocus={true}
                                                />
                                            </V>
                                            <Field
                                                LeftIcon={<FieldIcon icon="key" />}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                autoCompleteType="password"
                                                secureTextEntry={!this.state.showPassword}
                                                RightIcon={
                                                    <Touchable onPress={this.toggleShowPassword}>
                                                        <FieldIcon icon="eye" />
                                                    </Touchable>
                                                }
                                            />
                                            {!!this.state.error && (
                                                <T b1 color="Red1" pt={3}>
                                                    {this.state.error}
                                                </T>
                                            )}
                                            <V pt={1}>
                                                <Touchable onPress={this.forgotPassword}>
                                                    <V p={3} pl={0}>
                                                        <T link>Forgot password?</T>
                                                    </V>
                                                </Touchable>
                                            </V>
                                            <V pt={4} pb={3}>
                                                <MainButton
                                                    // disabled={this.state.lifeGoals.length === 0}
                                                    onPress={handleSubmit}
                                                    fullWidth
                                                    text={'Sign In'}
                                                />
                                            </V>
                                            <V>
                                                <T b1 color="Gray3">
                                                    Or sign in with:
                                                </T>
                                            </V>
                                            <V pt={3}>
                                                <MainButton
                                                    onPress={this.fbSignIn}
                                                    fullWidth
                                                    buttonColor="Blue1"
                                                    text={'Facebook'}
                                                    leftImage={Images.facebook}
                                                />
                                            </V>
                                            <V pt={3}>
                                                <MainButton
                                                    onPress={this.googleSignIn}
                                                    fullWidth
                                                    buttonColor="Red1"
                                                    text={'Google'}
                                                    leftImage={Images.google}
                                                />
                                            </V>
                                        </V>
                                    )}
                                </Formik>
                            </V>
                        </V>
                    </V>
                </ScrollView>
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
    },
    fieldContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.Gray4
    },
    inputStyle: {
        flex: 1,
        color: Colors.Gray2,
        ...Fonts.style.b1
    }
})

export default withNavigation(SignIn)
