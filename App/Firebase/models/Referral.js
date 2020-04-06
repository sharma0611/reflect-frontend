// @flow
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
    async isActive(id: string): Promise<{ active: boolean, days?: number }> {
        try {
            const { start, end, days } = await this.dataFromId(id)
            if (!start || !end || !days) return { active: false }
            if (!moment().isBetween(start, end)) return { active: false }
            return { active: true, days }
        } catch (e) {
            return { active: false }
        }
    }

    async getTrialEnd(id: string): Promise<Date | void> {
        const { start, end, days } = await this.dataFromId(id)
        if (!start || !end || !days) return
        if (!moment().isBetween(start, end)) return
        const trialEnd = moment()
            .add(days, 'days')
            .toDate()
        return trialEnd
    }
}

const Referral = new ReferralModel(COLLECTION_NAME)
export default Referral
