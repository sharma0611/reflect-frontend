// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'
import Question from 'Firebase/models/Question'
import type { EntryFields } from './Entry'

const COLLECTION_NAME = 'activities'

type ActivityFields = {
    color: string,
    isPro: boolean,
    name: string,
    published: boolean,
    questionIds: Array<string>,
    subtitle: string
}

type ActivitySkeletonFields = {
    color: string,
    isPro: boolean,
    name: string,
    entries: Array<EntryFields>,
    subtitle: string
}

class ActivityModel extends Model {
    publishedQuery(): firestore.Query {
        return this.collectionRef.where('published', '==', true)
    }

    published() {
        return this.dataFromQuery(this.publishedQuery())
    }

    listenToPublished(
        onData: (data: Array<ActivityFields>) => any,
        onError: (error: Error) => void
    ) {
        return this.listenToQuery(this.publishedQuery(), onData, onError)
    }

    _activityToSkeleton = async (activityData: ActivityFields): Promise<ActivitySkeletonFields> => {
        const { questionIds, published, ...restOfActivity } = activityData
        const rawQuestions = await new Promise.all(
            questionIds.map(async qId => {
                const { order, id, ...question } = await Question.dataFromId(qId)
                return { ...question, questionId: qId }
            })
        )
        const entries = rawQuestions.map(doc => ({
            ...doc,
            header: restOfActivity.name
        }))
        return { ...restOfActivity, entries }
    }

    listenToActivitySkeletons = (
        onActivitySkeletonData: (data: Array<ActivitySkeletonFields>) => void,
        onError: (error: Error) => void
    ) => {
        const onActivitiesData = async (activitiesData: Array<ActivityFields>) => {
            let activitySkeletons = []
            await new Promise.all(
                activitiesData.map(async activityData => {
                    const activitySkeleton = await this._activityToSkeleton(activityData)
                    activitySkeletons.push(activitySkeleton)
                })
            )
            onActivitySkeletonData(activitySkeletons)
        }
        return this.listenToPublished(onActivitiesData, onError)
    }
}

const Activity = new ActivityModel(COLLECTION_NAME)
export default Activity
