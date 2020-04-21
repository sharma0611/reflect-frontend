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

export const identify = async uid => {
    await Purchases.identify(uid)
}

export const getPrices = async () => {
    const offerings = await Purchases.getOfferings()
    const {
        all: {
            monthly: {
                availablePackages: [mPackage],
                monthly: {
                    product: { price_string: mPriceString }
                }
            },
            yearly: {
                availablePackages: [yPackage],
                annual: {
                    product: { price_string: yPriceString }
                }
            }
        }
    } = offerings
    return {
        yearly: { price: yPriceString, package: yPackage },
        monthly: { price: mPriceString, package: mPackage }
    }
}

export const purchasePackage = async (pkg, onSuccess) => {
    try {
        const { purchaserInfo } = await Purchases.purchasePackage(pkg)
        if (typeof purchaserInfo.entitlements.active.pro !== 'undefined') {
            onSuccess && onSuccess()
        }
    } catch (e) {
        if (!e.userCancelled) {
            throw e
        }
    }
}
