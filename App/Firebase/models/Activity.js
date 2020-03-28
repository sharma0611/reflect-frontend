// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'
import Question from 'Firebase/models/Question'
import type { EntryFields } from './Entry'
import type { QuestionFields } from './Question'
import sortBy from 'lodash/sortBy'

const COLLECTION_NAME = 'activities'

export type ActivityFields = {
    color: string,
    isPro: boolean,
    name: string,
    published: boolean,
    questionIds: Array<string>,
    subtitle: string
}

export type ActivitySkeletonFields = {
    color: string,
    isPro: boolean,
    name: string,
    entries: Array<EntryFields>,
    subtitle: string
}

class ActivityModel extends Model {
    publishedQuery(): firestore.Query {
        return this.collectionRef.where('published', '==', true).orderBy('order')
    }

    published(): Promise<Array<ActivityFields>> {
        return this.dataFromQuery(this.publishedQuery())
    }

    listenToPublished(
        onData: (data: Array<ActivityFields>) => any,
        onError: (error: Error) => void
    ) {
        return this.listenToQuery(this.publishedQuery(), onData, onError)
    }

    async withEntries(activity: ActivityFields): Promise<ActivitySkeletonFields> {
        const { questionIds, published, name, ...restOfActivity } = activity
        const questions = await Question.dataFromIds(questionIds)
        const entries = questions.map<EntryFields>((question: QuestionFields) => {
            const { order, id, ...restOfQuestion } = question
            return { ...restOfQuestion, questionId: question.id, header: name }
        })
        return { ...restOfActivity, name, entries }
    }

    listenToActivitySkeletons = (
        onActivitySkeletonData: (data: Array<ActivitySkeletonFields>) => void,
        onError: (error: Error) => void
    ) => {
        const onActivitiesData = async (activitiesData: Array<ActivityFields>) => {
            let activitySkeletons = []
            await new Promise.all(
                activitiesData.map(async activityData => {
                    const activitySkeleton = await this.withEntries(activityData)
                    activitySkeletons.push(activitySkeleton)
                })
            )
            const activities = sortBy(activitySkeletons, 'order')
            onActivitySkeletonData(activities)
        }
        return this.listenToPublished(onActivitiesData, onError)
    }
}

const Activity = new ActivityModel(COLLECTION_NAME)
export default Activity
