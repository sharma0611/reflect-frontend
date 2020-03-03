import Purchases from 'react-native-purchases'
import get from 'lodash-es/get'

export const hasProByUid = async uid => {
    if (!uid) return false
    Purchases.setDebugLogsEnabled(true)
    Purchases.setup('AsrJhdgHqgRWbbrENjMfQrpPAKarCQQb', uid)
    const pro = get(await Purchases.getPurchaserInfo(), 'entitlements.active.pro')
    return !!pro
}