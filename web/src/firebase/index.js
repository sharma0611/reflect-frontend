import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import firebaseConfig from './firebaseConfig'

// init
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore()
export const functions = firebase.functions()

// local emulators (yarn local and yarn emulators)
if (process.env.LOCAL) {
    db.settings({ host: 'http://localhost:8080', ssl: false })
    functions.useFunctionsEmulator('http://localhost:5001')
}

// auth
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signOut = () => auth.signOut()
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)
export const currentUser = () => firebase.auth().currentUser

// db
export const adminsRef = db.collection('admins')
export const activitiesRef = db.collection('activities')
export const activityResponsesRef = db.collection('activity_responses')
export const categoriesRef = db.collection('categories')
export const emojisRef = db.collection('emojis')
export const entriesRef = db.collection('entries')
export const profilesRef = db.collection('profiles')
export const questionsRef = db.collection('questions')
export const referralsRef = db.collection('referrals')

export const adminRef = () => currentUser() && adminsRef.doc(currentUser().uid)
export const adminRefFromId = id => id && adminsRef.doc(id)

export default firebase
