import firebase from 'firebase';
import 'firebase/firestore';

// import {store} from '@/store/store';

// firebase init goes here
var config = process.env.FIREBASE_CONFIG;

firebase.initializeApp(config);

// // firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
// const currentUser = auth.currentUser;

// // firebase collections
const usersCollection = db.collection('users');
// wanna change this to schemes
const schemesCollection = db.collection('scheme');
const booksCollection = db.collection('books');

// const postsCollection = db.collection('posts');
// const commentsCollection = db.collection('comments');
// const likesCollection = db.collection('likes');

export default {
  db,
  auth,
  // currentUser
  usersCollection,
  schemesCollection,
  booksCollection,
};
//   auth,
//   currentUser,
//   usersCollection,
//   postsCollection,
//   commentsCollection,
//   likesCollection
// };
