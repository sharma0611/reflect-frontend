import * as StoreReview from 'react-native-store-review'
import ActivityResponse from 'Firebase/models/ActivityResponse'
import Profile from 'Firebase/models/Profile'

const _showReview = () => {
    if (StoreReview.isAvailable) {
        StoreReview.requestReview()
    }
}

export const triggerReview = async () => {
    const numSaved = await ActivityResponse.numberSaved()
    const reviewAsked = await Profile.isReviewAsked()
    if (numSaved > 2 && !reviewAsked) {
        _showReview()
        await Profile.setReviewAsked()
    }
}
