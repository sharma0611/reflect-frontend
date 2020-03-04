import { useGlobal, useEffect } from 'reactn'
import { auth, profileRef } from '../Controllers/FirebaseController'
import { hasProByUid } from '../Controllers/PurchasesController'

// reactn
export const USER_DETAILS = 'userDetails'
export const initialUserDetailState = {
    initialized: false,
    uid: undefined,
    hasPro: false
}

/**
 * listens for auth user and profile doc changes and configures global state
 * @returns {{ initialized, profile, hasPro }}
 */
export function useGlobalUserListener() {
    const [userDetails, setUserDetails] = useGlobal(USER_DETAILS)
    const setDetails = (uid, hasPro) => setUserDetails({ initialized: true, uid, hasPro })

    const handler = async () => {
        const user = auth.currentUser
        if (!user) return setDetails(undefined, false)

        const uid = user.uid
        // const ref = profileRef(uid)
        // const profile = (await ref.get()).data()
        const pro = await hasProByUid(uid)

        await setDetails(uid, pro)

        // if (listenToProfile) {
        // const unsubscribe = ref.onSnapshot(doc => doc && setDetails(doc.data(), pro))
        // return unsubscribe
        // }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(handler)
        return unsubscribe
    }, [])
    return userDetails
}

/**
 * returns global state instantiated by useGlobalUserListener()
 * @returns {{ initialized, user, profile, hasPro }}
 */
export default function useUser() {
    const [userDetails] = useGlobal(USER_DETAILS)
    return userDetails
}
