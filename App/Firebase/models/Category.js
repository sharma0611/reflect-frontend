// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'

const COLLECTION_NAME = 'categories'

// Category Model
export type CategoryFields = {
    id: string,
    ama: boolean,
    color: string,
    isPro: boolean,
    name: string
}

class CategoryModel extends Model {
    amasQuery(): firestore.Query {
        return this.collectionRef.where('ama', '==', true)
    }

    amas(): Promise<Array<CategoryFields>> {
        return this.dataFromQuery(this.amasQuery())
    }

    listenToAMAs(onData: (data: Array<CategoryFields>) => void, onError: (error: Error) => void) {
        return this.listenToQuery(this.amasQuery(), onData, onError)
    }
}

const Category = new CategoryModel(COLLECTION_NAME)
export default Category
