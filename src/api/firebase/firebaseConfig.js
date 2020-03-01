import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// import store from '@/store/store';

firebase.initializeApp(process.env.FIREBASE_CONFIG);

// // firebase utils
const db = firebase.firestore();
const auth = firebase.auth();

const usersCollection = db.collection('users');
const schemesCollection = db.collection('scheme');
// this is subcollection.. dont hurt yourself
const booksCollection = db.collection('books');

// auth.onAuthStateChanged(user => {
//   if (user) {
//     store.dispatch('fetchUserProfile', user);
//   } else {
//     store.dispatch('localLogout');
//   }
// });

export default {
  db,
  auth,
  usersCollection,
  schemesCollection,
  booksCollection,
};
