// @flow
import firestore from '@react-native-firebase/firestore'
import AppConfig from 'Config/AppConfig'
import {
    mapDateValuesToTimestamp,
    mapTimestampValuesToDate,
    nowTimestamp,
    orderObjectsByIds
} from '../helpers'

import type { PaginatedResponse } from './Types'

const COLLECTION_PREFIX = AppConfig.isDev ? 'test_' : ''

export default class Model {
    collectionName: string
    collectionRef: firestore.CollectionReference

    constructor(collectionName: string) {
        const name = COLLECTION_PREFIX + collectionName
        this.collectionName = name
        this.collectionRef = firestore().collection(name)
    }

    docRef(id: string): firestore.DocumentReference {
        return this.collectionRef.doc(id)
    }

    newDocRef(): firestore.DocumentReference {
        return this.collectionRef.doc()
    }

    doc(id: string): Promise<firestore.DocumentSnapshot> {
        return this.docRef(id).get()
    }

    dataFromDoc(doc: firestore.DocumentSnapshot): any {
        const data = doc.data()
        const id = doc.id
        return { ...mapTimestampValuesToDate(data), id }
    }

    mapDataFromDocs(docs: Array<firestore.DocumentSnapshot>): Array<any> {
        return docs.map(doc => this.dataFromDoc(doc))
    }

    async dataFromDocRef(docRef: firestore.DocumentReference): Promise<any> {
        const doc = await docRef.get()
        return this.dataFromDoc(doc)
    }

    async dataFromQuery(query: firestore.Query): Promise<Array<any>> {
        const querySnapshot = await query.get()
        return this.mapDataFromDocs(querySnapshot.docs)
    }

    async dataFromPaginatedQuery(
        query: firestore.Query,
        limit: number,
        startAfter?: firestore.DocumentSnapshot
    ): Promise<PaginatedResponse> {
        let paginatedQuery = query
        if (startAfter) {
            paginatedQuery = paginatedQuery.startAfter(startAfter)
        }
        paginatedQuery = paginatedQuery.limit(limit)
        const querySnapshot = await paginatedQuery.get()
        return {
            data: this.mapDataFromDocs(querySnapshot.docs),
            lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
        }
    }

    async dataFromIds(ids: Array<string>): Promise<Array<any> | void> {
        if (ids.length > 10) {
            console.warn('in operator only supports up to 10 comparison values')
            return []
        }

        const query = this.collectionRef.where(firestore.FieldPath.documentId(), 'in', ids)
        const querySnapshot = await query.get()
        const data = this.mapDataFromDocs(querySnapshot.docs)
        return orderObjectsByIds(ids, data)
    }

    dataFromId(id: string): Promise<any> {
        const docRef = this.docRef(id)
        return this.dataFromDocRef(docRef)
    }

    listenToDocRef(
        docRef: firestore.DocumentReference,
        onData: (data: any) => void,
        onError: (error: Error) => void
    ) {
        return docRef.onSnapshot(doc => {
            const data = this.dataFromDoc(doc)
            onData(data)
        }, onError)
    }

    listenToQuery(
        query: firestore.Query,
        onData: (data: Array<any>) => void,
        onError: (error: Error) => void
    ) {
        return query.onSnapshot(querySnapshot => {
            const data = this.mapDataFromDocs(querySnapshot.docs)
            onData(data)
        }, onError)
    }

    listenToDocRefById(id: string, onData: (data: any) => void, onError: (error: Error) => void) {
        const docRef = this.docRef(id)
        return docRef.onSnapshot(onData, onError)
    }

    listenToCollectionRef(onData: (data: Array<any>) => void, onError: (error: Error) => void) {
        return this.listenToQuery(this.collectionRef, onData, onError)
    }

    async create(fields: any): Promise<firestore.DocumentReference> {
        const docRef = await this.newDocRef()
        const createdAt = nowTimestamp()
        await docRef.set({ ...mapDateValuesToTimestamp(fields), createdAt })
        return docRef
    }

    async createById(id: string, fields: any): Promise<firestore.DocumentReference | void> {
        if (!id) {
            console.warn('id parameter cannot be empty')
            return // TODO throw no id error
        }
        const docRef = this.docRef(id)
        const doc = await docRef.get()
        if (doc.exists) {
            console.warn(`document with id ${id} in ${this.collectionName} already exists`)
            return // TODO throw already exists error
        }
        const createdAt = nowTimestamp()
        await docRef.set({ ...mapDateValuesToTimestamp(fields), createdAt })
        return docRef
    }

    async deleteByRef(docRef: firestore.DocumentReference): Promise<void> {
        const doc = await docRef.get()
        if (!doc.exists) {
            console.warn(`document in ${this.collectionName} does not exist`)
            return // TODO throw does not exist error
        }
        await docRef.delete()
    }

    async deleteById(id: string): Promise<void> {
        const docRef = this.docRef(id)
        await this.deleteByRef(docRef)
    }

    async updateByRef(docRef: firestore.DocumentReference, fields: { ... }): Promise<void> {
        const doc = await docRef.get()
        if (!doc.exists) {
            console.warn(`document in ${this.collectionName} does not exist`)
            return // TODO throw does not exist error
        }
        await docRef.update({ ...mapDateValuesToTimestamp(fields) })
    }

    async updateById(id: string, fields: { ... }): Promise<void> {
        const docRef = this.docRef(id)
        await this.updateByRef(docRef, fields)
    }
}
