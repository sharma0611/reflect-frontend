// @flow
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Model from './Model'
import Analytics from 'Controllers/AnalyticsController'
import { hasProByUid } from 'Controllers/PurchasesController'
import Referral from './Referral'
import { inFuture } from '../helpers'

const COLLECTION_NAME = 'profiles'

export type ProfileFields = {
    displayName: string,
    email: string,
    uid: string,
    createdAt: Date,
    pin?: string,
    isPro?: boolean,
    trialEnd?: Date,
    referralId?: boolean
}

// Note
// For anything that gets setup on initial load or render, do not use auth.currentUser() methods
// instead pass in the UID from useUser hook
class ProfileModel extends Model {
    signOut(): Promise<void> {
        return auth().signOut()
    }

    async createWithEmail(
        email: string,
        password: string,
        displayName?: string,
        referralId?: string
    ): Promise<void> {
        await auth().createUserWithEmailAndPassword(email, password)
        await this._finishSignUp(displayName, referralId)
    }

    async signInWithEmail(email: string, password: string, displayName?: string): Promise<void> {
        await auth().signInWithEmailAndPassword(email, password)
        await this._finishSignUp(displayName)
    }

    async signInWithFacebook(
        accessToken: any,
        displayName?: string,
        referralId?: string
    ): Promise<void> {
        const credential = auth.FacebookAuthProvider.credential(accessToken)
        await auth().signInWithCredential(credential)
        await this._finishSignUp(displayName, referralId)
    }

    async signInWithGoogle(
        idToken: any,
        accessToken: any,
        displayName?: string,
        referralId?: string
    ): Promise<void> {
        const credential = auth.GoogleAuthProvider.credential(idToken, accessToken)
        await auth().signInWithCredential(credential)
        await this._finishSignUp(displayName, referralId)
    }

    async updateDisplayName(displayName: string): Promise<void> {
        await auth().currentUser.updateProfile({ displayName })
        await this.updateByRef(this._ref(), { displayName })
    }

    async updatePin(pin: string): Promise<void> {
        await this.updateByRef(this._ref(), { pin })
    }

    async getPin(uid?: string): Promise<string | void> {
        const { pin } = await this.dataFromDocRef(this._ref(uid))
        return pin
    }

    async unsetPin(): Promise<void> {
        await this.deleteFieldsByRef(this._ref(), ['pin'])
    }

    async checkPin(pin: string): Promise<boolean> {
        const { pin: correctPin } = await this.dataFromDocRef(this._ref())
        return pin === correctPin
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

    uid(): string | void {
        const user = auth().currentUser
        if (user) {
            return user.uid
        }
    }

    _ref = (uid?: string | void = this.uid()): firestore.DocumentReference => {
        return this.docRef(uid)
    }

    pro = async (uid?: string): Promise<boolean> => {
        const { isPro: provisionedPro, trialEnd } = await this.dataFromDocRef(this._ref(uid))
        const boughtPro = await hasProByUid(uid ? uid : this.uid())
        const trialPro = trialEnd && inFuture(trialEnd)
        return boughtPro || provisionedPro || trialPro
    }

    async _finishSignUp(newDisplayName?: string = '', referralId? = ''): Promise<void> {
        await this._setCurrentUserDisplayName(newDisplayName)
        const { uid, email, displayName } = auth().currentUser
        let newFields = { displayName, email, uid }
        const trialEnd = await Referral.getTrialEnd(referralId)
        if (trialEnd) {
            newFields = { ...newFields, referralId, trialEnd }
        }
        const newDocRef = await this.createById(uid, newFields)
        this._aliasOrIdentify(!!newDocRef)
    }

    async _setCurrentUserDisplayName(displayName: string): Promise<void> {
        if (!auth().currentUser.displayName || displayName) {
            await auth().currentUser.updateProfile({ displayName })
        }
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
