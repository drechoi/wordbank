import firebase from 'firebase/app';
import 'firebase/firestore';

// firebase init goes here
// var config = process.env.FIREBASE_CONFIG;

var config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID
}
// firebase.initializeApp(config)

console.log('firebase config: ');
console.log(process.env.FIREBASE_CONFIG);
console.log(process.env);
console.log(config);

firebase.initializeApp(config);

console.log('fire base init done');

// // firebase utils
const db = firebase.firestore();
const auth = firebase.auth();

const usersCollection = db.collection('users');
const schemesCollection = db.collection('scheme');
const booksCollection = db.collection('books');

export default {
  db,
  auth,
  usersCollection,
  schemesCollection,
  booksCollection,
};
