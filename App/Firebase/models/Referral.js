// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'
import moment from 'moment'

const COLLECTION_NAME = 'referrals'

// Referral Model
export type ReferralFields = {
    start: Date,
    end: Date,
    days: number
}

class ReferralModel extends Model {
    async dataFromActiveId(id: string): Promise<Date | void> {
        const { start, end, days } = await this.dataFromId(id)
        if (!start || !end || !days) return
        if (!moment().isBetween(start, end)) return
        const trialEnd = moment()
            .add(days, 'days')
            .toDate()
        return { start, end, days, trialEnd }
    }
}

const Referral = new ReferralModel(COLLECTION_NAME)
export default Referral
