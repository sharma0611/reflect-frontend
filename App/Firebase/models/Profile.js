// @flow
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Model from './Model'
import Analytics from 'Controllers/AnalyticsController'
import { hasProByUid } from 'Controllers/PurchasesController'

const COLLECTION_NAME = 'profiles'

export type ProfileFields = {
    displayName: string,
    email: string,
    uid: string
}

// Note
// For anything that gets setup on initial load or render, do not use auth.currentUser() methods
// instead pass in the UID from useUser hook
class ProfileModel extends Model {
    signOut(): Promise<void> {
        return auth().signOut()
    }

    async createWithEmail(email: string, password: string, displayName?: string): Promise<void> {
        await auth().createUserWithEmailAndPassword(email, password)
        await this._finishSignUp(displayName)
    }

    async signInWithEmail(email: string, password: string, displayName?: string): Promise<void> {
        await auth().signInWithEmailAndPassword(email, password)
        await this._finishSignUp(displayName)
    }

    async signInWithFacebook(accessToken: any, displayName?: string): Promise<void> {
        const credential = auth.FacebookAuthProvider.credential(accessToken)
        await auth().signInWithCredential(credential)
        await this._finishSignUp(displayName)
    }

    async signInWithGoogle(idToken: any, accessToken: any, displayName?: string): Promise<void> {
        const credential = auth.GoogleAuthProvider.credential(idToken, accessToken)
        await auth().signInWithCredential(credential)
        await this._finishSignUp(displayName)
    }

    async updateDisplayName(displayName: string): Promise<void> {
        await auth().currentUser.updateProfile({ displayName })
        await this.updateByRef(this._ref(), { displayName })
    }

    async delete(): Promise<void> {
        await super.deleteByRef(this._ref())
        await auth().currentUser.delete()
    }

    listen(onData: (data: ProfileFields) => void, onError: () => void, uid?: string) {
        // pass in UID here to avoid uninitialized firebase state on setup
        return this.listenToDocRef(this._ref(uid), onData, onError)
    }

    listenToAuthState(listener: (user: any | void) => void) {
        return auth().onAuthStateChanged(listener)
    }

    uid(): string {
        const user = auth().currentUser
        return user.uid
    }

    _ref = (uid?: string = this.uid()): firestore.DocumentReference => {
        return this.docRef(uid)
    }

    pro = async (uid?: string): Promise<boolean> => {
        const { isPro: provisionedPro } = await this.dataFromDocRef(this._ref(uid))
        const boughtPro = await hasProByUid(this.uid())
        return boughtPro || provisionedPro
    }

    async _finishSignUp(newDisplayName?: string = ''): Promise<void> {
        if (!auth().currentUser.displayName || newDisplayName) {
            await auth().currentUser.updateProfile({ displayName: newDisplayName })
        }
        const { uid, email, displayName } = auth().currentUser
        const newDocRef = await this.createById(uid, { displayName, email, uid })
        this._aliasOrIdentify(!!newDocRef)
    }

    _aliasOrIdentify(existing: boolean) {
        return existing ? this._identify() : this._alias()
    }

    _alias(): void {
        const uid = this.uid()
        if (!uid) return
        Analytics.aliasByUid(uid)
    }

    _identify(): void {
        const uid = this.uid()
        if (!uid) return
        Analytics.identifyByUid(uid)
    }
}

const Profile = new ProfileModel(COLLECTION_NAME)
export default Profile
