import firebase, { ServiceAccount } from 'firebase-admin'
import serviceKey from '../serviceKey.json'

console.log(serviceKey)
const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(serviceKey as ServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
})

export default firebaseApp.firestore()
