//@flow
import firestore from '@react-native-firebase/firestore'

export type PaginatedResponse = { data: Array<any>, lastDoc: firestore.DocumentSnapshot }

// export type AnyFirestoreObject =
//     | ActivityFields
//     | EntryFields
//     | ProfileFields
//     | QuestionFields
//     | ActivityResponseFields
//     | CategoryFields

// export type AllFirestoreObjects = ActivityFields &
//     EntryFields &
//     ProfileFields &
//     QuestionFields &
//     ActivityResponseFields &
//     CategoryFields
