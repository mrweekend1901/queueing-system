// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCVomx5VhewZ2F6wbhUyO-EcPUtjLitwc0',
  authDomain: 'queueing-system-7cfbe.firebaseapp.com',
  projectId: 'queueing-system-7cfbe',
  storageBucket: 'queueing-system-7cfbe.appspot.com',
  messagingSenderId: '341045760263',
  appId: '1:341045760263:web:5c51f07e01452b651e75a2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
