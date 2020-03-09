import useProfile from 'Hooks/useProfile'
import useCategories from 'Hooks/useCategories'
import useActivities from 'Hooks/useActivities'
import useDailyReflection from './useDailyReflection'

export default function useHomeScreenData() {
    const { loading: profileLoading, error: profileError, profile } = useProfile()
    const { loading: categoryLoading, error: categoryError, categories } = useCategories()
    const { loading: activityLoading, error: activityError, activities } = useActivities()
    const {
        loading: dailyReflectionLoading,
        error: dailyReflectionError,
        dailyReflection
    } = useDailyReflection()
    const loading = profileLoading || categoryLoading || activityLoading || dailyReflectionLoading
    const error = profileError || categoryError || activityError || dailyReflectionError
    return { loading, error, profile, categories, activities, dailyReflection }
}
