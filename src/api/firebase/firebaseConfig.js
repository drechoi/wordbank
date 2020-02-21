import firebase from 'firebase';
import 'firebase/firestore';

import {store} from '@/store/store';

// firebase init goes here
var config = process.env.FIREBASE_CONFIG;

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  // TODO: see if anything to handle for token expired
  if (user) {
    console.log(store);
    store.commit('setCurrentUser', user);
    store.dispatch('fetchUserProfile');
  }
});

// // firebase utils
// const db = firebase.firestore();
// const auth = firebase.auth();
// const currentUser = auth.currentUser;

// // firebase collections
// const usersCollection = db.collection('users');
// const postsCollection = db.collection('posts');
// const commentsCollection = db.collection('comments');
// const likesCollection = db.collection('likes');

// export {
//   db,
//   auth,
//   currentUser,
//   usersCollection,
//   postsCollection,
//   commentsCollection,
//   likesCollection
// };
