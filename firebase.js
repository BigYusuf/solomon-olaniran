// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FBASE_AUTH_DOMAIN,
  db_imageURL: process.env.NEXT_PUBLIC_FBASE_DB_IMAGEURL,
  projectId: process.env.NEXT_PUBLIC_FBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FBASE_MESSAGE_ID,
  appId: process.env.NEXT_PUBLIC_FBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);