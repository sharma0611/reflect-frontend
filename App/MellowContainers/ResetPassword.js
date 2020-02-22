// @flow
import React from 'react'
import { StyleSheet, TextInput, ScrollView } from 'react-native'
import { Colors, Fonts } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import MainButton from 'MellowComponents/MainButton'
import LeftChevron from 'MellowComponents/LeftChevron'
import { withNavigation } from 'react-navigation'
import Touchable from 'Components/Touchable'
import BlueBackground from 'MellowComponents/BlueBackground'
import { Formik } from 'formik'
import FIcon from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth'

type Props = {}

type State = {
    name: string
}

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

class ResetPassword extends React.Component<Props, State> {
    state = {
        error: '',
        success: ''
    }

    submit = async formData => {
        const { email } = formData
        await this.setState({ error: '' })
        try {
            await auth().sendPasswordResetEmail(email)
            await this.setState({ success: 'Email sent!' })
        } catch (e) {
            await this.setState({ error: e.message })
        }
    }

    render() {
        return (
            <BlueBackground>
                <V p={4}>
                    <LeftChevron />
                </V>
                <V p={4} pt={0} ai="center">
                    <T heading3 color="Gray1" ta="center">
                        Let's reset your password.
                    </T>
                </V>
                <V flex={1} bg="WhiteM" style={styles.whiteContainer}>
                    <ScrollView>
                        <V p={5}>
                            <T heading4 color="Gray1">
                                Enter your email
                            </T>
                            <V pt={5}>
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    onSubmit={values => this.submit(values)}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                                        <V>
                                            <Field
                                                LeftIcon={<FieldIcon icon="mail" />}
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                autoCompleteType="email"
                                                autoFocus={true}
                                            />
                                            {!!this.state.error && (
                                                <T b1 color="Red1" pt={3}>
                                                    {this.state.error}
                                                </T>
                                            )}
                                            <V pt={1}>
                                                <Touchable>
                                                    <V p={3} pl={0}>
                                                        <T b1 color="Gray1">
                                                            We’ll send you an email with a password
                                                            reset link.
                                                        </T>
                                                    </V>
                                                </Touchable>
                                            </V>
                                            {!!this.state.success && (
                                                <T b1 color="Green1" pt={3}>
                                                    {this.state.success}
                                                </T>
                                            )}
                                            <V pt={4} pb={3}>
                                                <MainButton
                                                    onPress={handleSubmit}
                                                    fullWidth
                                                    text={'Send reset link'}
                                                />
                                            </V>
                                        </V>
                                    )}
                                </Formik>
                            </V>
                        </V>
                    </ScrollView>
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

export default withNavigation(ResetPassword)
