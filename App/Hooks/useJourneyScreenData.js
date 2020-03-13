import useActivityResponses from 'Hooks/useActivityResponses'
import useMoods from 'Hooks/useMoods'
import moment from 'moment'

export default function useJourneyScreenData() {
    const {
        loading: activityResponsesLoading,
        error: activityResponsesError,
        clear,
        loadMore,
        hasMore,
        activityResponses
    } = useActivityResponses()
    const startOfWeek = moment()
        .startOf('week')
        .toDate()
    const endOfWeek = moment()
        .endOf('week')
        .toDate()
    const { loading: moodsLoading, error: moodsError, moods: moodData } = useMoods({
        startDate: startOfWeek,
        endDate: endOfWeek
    })
    const moods = moodData.map(mood => {
        const { responseText: emoji, timestamp, id } = mood
        const day = timestamp.toDate().getDay()
        return { day, emoji, id }
    })

    const loading = activityResponsesLoading || moodsLoading
    const error = activityResponsesError || moodsError
    return {
        loading,
        error,
        clear,
        loadMore,
        hasMore,
        activityResponses,
        moods
    }
}
