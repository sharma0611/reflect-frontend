// @flow
import Model from './Model'

const COLLECTION_NAME = 'questions'

type fields = {
    categoryId: string,
    order: number,
    questionText: string
}

class QuestionModel extends Model {}

const Question = new QuestionModel(COLLECTION_NAME)
export default Question
