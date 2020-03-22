// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'

const COLLECTION_NAME = 'categories'

type fields = {
    ama: boolean,
    color: string,
    isPro: boolean,
    name: string
}

class CategoryModel extends Model {
    amasQuery(): firestore.Query {
        return this.collectionRef.where('ama', '==', true)
    }

    amas(): Promise<Array<{}>> {
        return this.dataFromQuery(this.amasQuery())
    }

    listenToAMAs(onData: (data: Array<{}>) => void, onError: (error: Error) => void) {
        return this.listenToQuery(this.amasQuery(), onData, onError)
    }
}

const Category = new CategoryModel(COLLECTION_NAME)
export default Category
