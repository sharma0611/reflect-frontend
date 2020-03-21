// @flow
import Model from './Model'

const COLLECTION_NAME = 'entries'

export type EntryFields = {
    caption: string,
    categoryId: string,
    header: string,
    questionId: string,
    questionText: string,
    responseText: string,
    timestamp: Date,
    uid: string
}

class EntryModel extends Model {}

const Entry = new EntryModel(COLLECTION_NAME)
export default Entry
