// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'
import Question from './Question'

const COLLECTION_NAME = 'activities'

type fields = {
    color: string,
    isPro: boolean,
    name: string,
    published: boolean,
    questionIds: Array<string>,
    subtitle: string
}

class ActivityModel extends Model {
    publishedQuery(): firestore.Query {
        return this.collectionRef.where('published', '==', true)
    }

    published() {
        return this.dataFromQuery(this.publishedQuery())
    }

    listenToPublished(onData: (data: Array<{}>) => void, onError: (error: Error) => void) {
        return this.listenToQuery(this.publishedQuery(), onData, onError)
    }

    async withEntries(activity: fields) {
        const { questionIds, name } = activity
        const questions: Array<any> = await Question.dataFromIds(questionIds)
        const entries = questions.map<any>((question: any) => ({
            ...question,
            questionId: question.id,
            header: name,
            id: undefined
        }))
        return { ...activity, entries }
    }
}

const Activity = new ActivityModel(COLLECTION_NAME)
export default Activity
