import firebase from 'firebase/app';
import 'firebase/firestore';

// firebase init goes here
var config = process.env.FIREBASE_CONFIG;

console.log('firebase config: ');
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
