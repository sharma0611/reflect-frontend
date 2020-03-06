import useProfile from 'Hooks/useProfile'
import useCategories from 'Hooks/useCategories'
import useActivities from 'Hooks/useActivities'

export default function useHomeScreenData() {
    const { loading: profileLoading, error: profileError, profile } = useProfile()
    const { loading: categoryLoading, error: categoryError, categories } = useCategories()
    const { loading: activityLoading, error: activityError, activities } = useActivities()
    const loading = profileLoading || categoryLoading || activityLoading
    const error = profileError || categoryError || activityError
    return { loading, error, profile, categories, activities }
}
