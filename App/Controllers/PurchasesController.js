import Purchases from 'react-native-purchases'
import Analytics from 'Controllers/AnalyticsController'
import get from 'lodash-es/get'

export const hasProByUid = async uid => {
    if (!uid) return false
    Purchases.setDebugLogsEnabled(true)
    Purchases.setup('AsrJhdgHqgRWbbrENjMfQrpPAKarCQQb', uid)
    const pro = get(await Purchases.getPurchaserInfo(), 'entitlements.active.pro')
    return !!pro
}

export const getPrices = async () => {
    const entitlements = await Purchases.getEntitlements()
    let monthlyPriceString, yearlyPriceString
    let {
        pro: {
            monthly: { price_string: mPriceString },
            yearly: { price_string: yPriceString }
        }
    } = entitlements
    monthlyPriceString = mPriceString
    yearlyPriceString = yPriceString
    return { yearly: yearlyPriceString, monthly: monthlyPriceString }
}

export const purchaseMonthly = async onSuccess => {
    const entitlements = await Purchases.getEntitlements()
    const {
        pro: {
            monthly: { identifier: monthlyIdentifier }
        }
    } = entitlements
    Analytics.selectMonthlySubscription()
    const purchaseMade = await Purchases.makePurchase(monthlyIdentifier)
    if (typeof purchaseMade.purchaserInfo.entitlements.active.pro !== 'undefined') {
        Analytics.unlockPro()
        onSuccess && onSuccess()
    }
}

export const purchaseYearly = async onSuccess => {
    const entitlements = await Purchases.getEntitlements()
    const {
        pro: {
            yearly: { identifier: yearlyIdentifier }
        }
    } = entitlements
    Analytics.selectAnnualSubscription()
    const purchaseMade = await Purchases.makePurchase(yearlyIdentifier)
    if (typeof purchaseMade.purchaserInfo.entitlements.active.pro !== 'undefined') {
        Analytics.unlockPro()
        onSuccess && onSuccess()
    }
}
