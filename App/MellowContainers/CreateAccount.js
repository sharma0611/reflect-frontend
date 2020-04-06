// @flow
import React from 'reactn'
import { StyleSheet, TextInput, ScrollView } from 'react-native'
import { Colors, Images, Fonts } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import MainButton from 'MellowComponents/MainButton'
import LeftChevron from 'MellowComponents/LeftChevron'
import { withNavigation } from 'react-navigation'
import BlueBackground from 'MellowComponents/BlueBackground'
import FIcon from 'react-native-vector-icons/Feather'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from '@react-native-community/google-signin'
import Profile from 'Firebase/models/Profile'
import Referral from 'Firebase/models/Referral'
import Spinner from 'react-native-spinkit'

type Props = {}

type State = {}

const FieldIcon = ({ icon, color }) => {
    return <FIcon name={icon} size={20} color={color ? color : Colors.Gray4} />
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

class CreateAccount extends React.Component<Props, State> {
    state = {
        referralCode: '',
        error: '',
        success: false,
        dirty: false,
        typing: false
    }

    navigateToEmail = () => {
        this.props.navigation.navigate('EmailSignUp', { referralCode: this.state.referralCode })
    }

    componentDidMount() {
        let intervalId = setInterval(this.timer, 500)
        this.intervalId = intervalId
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    submitReferralCode = async () => {
        const { referralCode } = this.state
        try {
            const { active, days } = await Referral.isActive(referralCode)
            await this.setState({ error: '', success: active, dirty: false, days })
        } catch (e) {
            await this.setState({ error: e.message, dirty: false })
        }
    }

    timer = () => {
        const { dirty, typing } = this.state
        if (dirty && !typing) {
            this.submitReferralCode()
        } else if (dirty) {
            this.setState({ typing: false })
        }
    }

    fbSignIn = async () => {
        const { name: displayName } = this.global
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

        if (result.isCancelled) {
            // throw new Error('Error: login cancelled')
            this.setState({ error: 'Error: Login Cancelled.' })
        }

        const { accessToken } = await AccessToken.getCurrentAccessToken()

        if (!accessToken) {
            // throw new Error('Something went wrong obtaining access token')
            this.setState({ error: 'Error: Something went wrong getting the access token.' })
        }

        await Profile.signInWithFacebook(accessToken, displayName, this.state.referralCode)
    }

    googleSignIn = async () => {
        const { name: displayName } = this.global
        const { idToken, accessToken } = await GoogleSignin.signIn()
        await Profile.signInWithGoogle(idToken, accessToken, displayName, this.state.referralCode)
    }

    rightIcon = () => {
        if (this.state.referralCode.length > 0 && this.state.dirty) {
            return <Spinner type="FadingCircleAlt" size={18} color={Colors.Blue3} />
        } else if (this.state.success) {
            return <FieldIcon icon="check-circle" color={Colors.Green3} />
        } else if (!this.state.success && this.state.referralCode.length > 0) {
            return <FieldIcon icon="x-circle" color={Colors.PastelRed} />
        }
    }

    render() {
        return (
            <BlueBackground>
                <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
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
                    <V flex={1} bg="WhiteM" style={styles.whiteContainer}>
                        <V p={5}>
                            <T heading4 color="Gray1">
                                Create your account
                            </T>
                            <V pt={4}>
                                <T heading5 color="Gray1" pb={2}>
                                    Enter a referral code
                                </T>
                                <V>
                                    <Field
                                        LeftIcon={<FieldIcon icon="gift" />}
                                        onChangeText={text =>
                                            this.setState({
                                                referralCode: text,
                                                dirty: true,
                                                typing: true,
                                                success: false
                                            })
                                        }
                                        value={this.state.referralCode}
                                        RightIcon={this.rightIcon()}
                                        autoCapitalize="characters"
                                    />
                                    {this.state.success && (
                                        <T pt={2} color="Gray2">
                                            You unlocked {this.state.days} days of free premium! 😛
                                        </T>
                                    )}
                                    <V pt={4}>
                                        <T b1 color="Gray3">
                                            Sign up with
                                        </T>
                                    </V>
                                    <V pt={3}>
                                        <MainButton
                                            onPress={this.navigateToEmail}
                                            fullWidth
                                            text={'Email'}
                                            leftImage={Images.mail}
                                        />
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
                                    {!!this.state.error && (
                                        <T b1 color="Red1" pt={3}>
                                            {this.state.error}
                                        </T>
                                    )}
                                    <V pt={3}>
                                        <T b1 color="Gray3">
                                            By signing up, you agree to Reflect’s Terms of Service
                                            and Privacy Policy
                                        </T>
                                    </V>
                                </V>
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

export default withNavigation(CreateAccount)
