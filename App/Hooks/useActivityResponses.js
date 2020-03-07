import { useState, useEffect } from 'react'
import { fetchActivityResponsesDocs, getDataFromDocWithId } from '../Controllers/FirebaseController'
import * as Sentry from '@sentry/react-native'

const LIMIT = 5

export default function useActivityResponses() {
    const initialState = {
        loading: true,
        error: false,
        activityResponses: [],
        lastDoc: undefined,
        hasMore: true
    }

    const [
        { loading, error, activityResponses, hasMore, lastDoc },
        setActivityResponses
    ] = useState(initialState)

    const loadMore = async ({ fresh }) => {
        let currActivityResponses = []
        let currHasMore = true
        let currLastDoc = undefined
        const docs = await fetchActivityResponsesDocs(LIMIT, fresh ? undefined : lastDoc)
        if (docs.length < LIMIT) {
            currHasMore = false
        }
        docs.map((doc, index) => {
            const activity = getDataFromDocWithId(doc)
            currActivityResponses.push(activity)
            if (index === docs.length - 1) {
                currLastDoc = doc
            }
        })
        setActivityResponses({
            activityResponses: fresh
                ? currActivityResponses
                : [...activityResponses, ...currActivityResponses],
            loading: false,
            error: false,
            hasMore: currHasMore,
            lastDoc: currLastDoc
        })
    }

    const clear = () => {
        setActivityResponses(initialState)
        loadMore({ fresh: true })
    }

    const onError = err => {
        setActivityResponses({
            activityResponses: undefined,
            loading: false,
            hasMore: false,
            lastDoc: undefined,
            error: 'Error: ActivityResponses not found.'
        })
        Sentry.captureException(err)
    }

    useEffect(() => {
        try {
            loadMore({ fresh: true })
        } catch (e) {
            onError(e)
        }
    }, [])

    return { loading, error, hasMore, loadMore, clear, activityResponses }
}
