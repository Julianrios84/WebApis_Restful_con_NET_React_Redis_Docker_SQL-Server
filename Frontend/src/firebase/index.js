// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9DCqUOvLxRCwDXup6ypqhcaWHmkRmd10",
  authDomain: "marketplace-5bf0c.firebaseapp.com",
  projectId: "marketplace-5bf0c",
  storageBucket: "marketplace-5bf0c.appspot.com",
  messagingSenderId: "834138354774",
  appId: "1:834138354774:web:e3842c3cfe9d14eb3bf7f7"
};

// Initialize Firebase
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();


export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const uploadProcess = storage.ref(`pictures/${file.name}-${file.lastModified}`).put(file);

    uploadProcess.on('state_changed', (snapshot) => console.log(`the file is uploading ${snapshot}`), reject, () => {
      storage.ref('prictures').child(`${file.name}-${file.lastModified}`).getDownloadURL().then(resolve);
    })
  })
}