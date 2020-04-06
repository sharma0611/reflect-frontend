import { useGlobal, useEffect } from 'reactn'
import Profile from 'Firebase/models/Profile'

export const USER = 'user'
export const initialUserState = { loading: true, uid: undefined }

export function setupUser() {
    const [{ loading, uid }, setUser] = useGlobal(USER)

    const refetch = user => {
        let { uid } = initialUserState
        if (user) {
            const { uid } = user
            return setUser({ loading: false, uid })
        } else {
            return setUser({ loading: false, uid })
        }
    }

    useEffect(() => {
        const unsubscribe = Profile.listenToAuthState(refetch)
        return unsubscribe
    }, [])

    return { loading, uid }
}

const useUser = () => {
    const [{ loading, uid }, setUser] = useGlobal(USER)
    return { loading, uid }
}

export default useUser
