// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'

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
}

const Activity = new ActivityModel(COLLECTION_NAME)
export default Activity
