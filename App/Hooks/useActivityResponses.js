import { useState, useEffect } from 'react'
import * as Sentry from '@sentry/react-native'
import ActivityResponse from '../Firebase/models/ActivityResponse'

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
        let currHasMore = true
        let {
            data: currActivityResponses,
            lastDoc: currLastDoc
        } = await ActivityResponse.paginatedResponsesWithEntries(LIMIT, fresh ? undefined : lastDoc)
        if (currActivityResponses.length < LIMIT) {
            currHasMore = false
        }
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
