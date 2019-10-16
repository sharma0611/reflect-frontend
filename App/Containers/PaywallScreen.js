// @flow
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Metrics, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import Section from 'Components/Section'
import AsModal from 'HOC/AsModal'
import Header, { HEADER_HEIGHT } from 'Components/Header'
import TouchableCard from 'Components/TouchableCard'
import Icon from 'react-native-vector-icons/Entypo'
import Card from 'Components/Card'
import Analytics from 'Controllers/AnalyticsController'
import Purchases from 'react-native-purchases'
import userExposedToContainer from 'State/userExposedTo'
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from 'Data/urls'
import Touchable from 'Components/Touchable'
import LoadingSpinner from 'Components/LoadingSpinner'

type Props = {}

type State = {}

const ValueProp = (iconName, header, text) => {
    return (
        <Card bg="WhiteM" ai="center" m={2}>
            <V row bg={'BrandM'} p={2} ai="center" style={styles.headerContainer}>
                <Icon name={iconName} size={30} color={Colors.WhiteM} />
                <T color="WhiteM" emphasis heading pl={2}>
                    {header}
                </T>
                <V flex={1} />
            </V>
            <V p={2} py={3}>
                <T ta="center" color="GreyL">
                    {text}
                </T>
            </V>
        </Card>
    )
}

class PaywallScreen extends React.Component<Props, State> {
    state = {
        entitlements: {},
        loaded: false,
        offline: false
    }
    selectMonthlySub = async () => {
        const {
            pro: {
                monthly: { identifier: monthlyIdentifier }
            }
        } = this.state.entitlements
        Analytics.selectMonthlySubscription()
        const purchaseMade = await Purchases.makePurchase(monthlyIdentifier)
        if (typeof purchaseMade.purchaserInfo.entitlements.active.pro !== 'undefined') {
            // Unlock that great "pro" content
            userExposedToContainer.unlockPro()
        }
        // this.props.navigation.navigate('ComingSoon')
        this.props.navigation.goBack(null)
    }

    selectAnnualSub = async () => {
        const {
            pro: {
                yearly: { identifier: yearlyIdentifier }
            }
        } = this.state.entitlements
        Analytics.selectAnnualSubscription()
        const purchaseMade = await Purchases.makePurchase(yearlyIdentifier)
        if (typeof purchaseMade.purchaserInfo.entitlements.active.pro !== 'undefined') {
            // Unlock that great "pro" content
            userExposedToContainer.unlockPro()
        }
        this.props.navigation.goBack(null)
    }

    bootstrapData = async () => {
        try {
            const entitlements = await Purchases.getEntitlements()
            this.setState({ entitlements, loaded: true })
        } catch {
            this.setState({ offline: true })
        }
    }

    componentDidMount() {
        this.bootstrapData()
    }

    renderPaywallContent() {
        if (!this.state.loaded && !this.state.offline) {
            return <LoadingSpinner />
        } else if (this.state.loaded) {
            let monthlyPriceString, yearlyPriceString
            let {
                pro: {
                    monthly: { price_string: mPriceString },
                    yearly: { price_string: yPriceString }
                }
            } = this.state.entitlements
            monthlyPriceString = mPriceString
            yearlyPriceString = yPriceString
            return (
                <ScrollView>
                    <Section ai="center" m={2}>
                        {ValueProp(
                            'pencil',
                            'Journal Prompts',
                            'Access 500+ journal prompts with new additions each week'
                        )}
                        {ValueProp(
                            'list',
                            'Personalized Reflections',
                            'We use your mood data to build your daily reflections for self-growth'
                        )}
                        {ValueProp(
                            'calendar',
                            'Progress Report',
                            'Get full mood history and analytics'
                        )}
                    </Section>
                    <Section>
                        <TouchableCard
                            bg="WhiteM"
                            p={2}
                            px={3}
                            containerStyle={styles.bottomRightButtonContainer}
                            onPress={this.selectMonthlySub}
                        >
                            <V row py={1}>
                                <V flex={8} row ai="flex-end">
                                    <T color="BrandM" titleL emphasis>
                                        {monthlyPriceString}
                                    </T>
                                    <T color="BrandM" heading px={1}>
                                        / month
                                    </T>
                                </V>
                                <V flex={1}>
                                    <T ta="right" titleS color="BrandM">
                                        >
                                    </T>
                                </V>
                            </V>
                        </TouchableCard>
                    </Section>
                    <Section pb={4}>
                        <TouchableCard
                            bg="BrandM"
                            p={2}
                            px={3}
                            containerStyle={styles.bottomRightButtonContainer}
                            onPress={this.selectAnnualSub}
                        >
                            <V row py={1} ai="center">
                                <V flex={8} row ai="flex-end">
                                    <T color="WhiteM" titleL emphasis>
                                        {yearlyPriceString}
                                    </T>
                                    <T color="WhiteM" heading px={1}>
                                        / year
                                    </T>
                                </V>
                                <T color="WhiteM" heading px={1}>
                                    30% off
                                </T>
                                <V flex={1}>
                                    <T ta="right" titleS color="WhiteM">
                                        >
                                    </T>
                                </V>
                            </V>
                        </TouchableCard>
                    </Section>
                    <Section ai="center">
                        <Touchable
                            onPress={() =>
                                this.props.navigation.navigate('WebView', {
                                    url: TERMS_OF_USE_URL
                                })
                            }
                        >
                            <T color="GreyM">Terms of Use</T>
                        </Touchable>
                        <Touchable
                            onPress={() =>
                                this.props.navigation.navigate('WebView', {
                                    url: PRIVACY_POLICY_URL
                                })
                            }
                        >
                            <T color="GreyM">Privacy Policy</T>
                        </Touchable>
                    </Section>
                </ScrollView>
            )
        } else if (this.state.offline) {
            return (
                <V p={4}>
                    <T heading color="GreyM" p={2}>
                        Connection Error!
                    </T>
                    <T heading color="GreyM" p={2}>
                        Please check that you have an internet connection!
                    </T>
                </V>
            )
        }
    }

    render() {
        let goBack
        try {
            goBack = this.props.navigation.state.params.goBack
        } catch {
            goBack = null
        }
        return (
            <Screen pt={HEADER_HEIGHT} bg="transparent">
                {this.renderPaywallContent()}
                <Header
                    title={'Unlock self growth'}
                    bg="BrandM"
                    white
                    onClose={goBack ? () => this.props.navigation.goBack(null) : null}
                />
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        borderTopLeftRadius: Metrics.padding.small,
        borderTopRightRadius: Metrics.padding.small
    }
})

export default AsModal(PaywallScreen)
