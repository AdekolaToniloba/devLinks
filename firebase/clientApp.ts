import {initializeApp, getApps} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomian: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}; 

let firebase_app = getApps().length === 0 ? initializeApp(clientCredentials) : getApps()[0];
console.log("Firebase app initialized:", firebase_app.name);

export const auth = getAuth(firebase_app);
export const db = getFirestore(firebase_app);

console.log("Firestore instance:", db);