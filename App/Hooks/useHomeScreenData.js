import useProfile from 'Hooks/useProfile'
import useCategories from 'Hooks/useCategories'

export default function useHomeScreenData() {
    const { loading: profileLoading, error: profileError, profile } = useProfile()
    const { loading: categoryLoading, error: categoryError, categories } = useCategories()
    const loading = profileLoading || categoryLoading
    const error = profileError || categoryError
    return { loading, error, profile, categories }
}
