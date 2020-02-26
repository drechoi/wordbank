import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(process.env.FIREBASE_CONFIG);

// // firebase utils
const db = firebase.firestore();
const auth = firebase.auth();

const usersCollection = db.collection('users');
const schemesCollection = db.collection('scheme');
// this is subcollection.. dont hurt yourself
const booksCollection = db.collection('books');

export default {
  db,
  auth,
  usersCollection,
  schemesCollection,
  booksCollection,
};
