import firebase from 'firebase';
import firestore from '@/api/firebase/firebaseConfig';
// const firestore = require('@/api/firebase/firebaseConfig');

function createUserProfile() {
  return {
    schemes: [],
    defaultScheme: null,
    settings: null,
  };
};

function createNewScheme(schemeName) {
  return {
    schemeName: schemeName,
    books: []
  };
};

const usersCollection = firestore.usersCollection;
const schemesCollection = firestore.schemesCollection;

export default {
  state: {
    currentUser: null,
    userProfile: {}
  },
  actions: {
    fetchUserProfile({commit, state}) {
      if (!state.currentUser) {
        throw new Error('Invalid state. fetch profile without user');
      }

      // const db = firebase.firestore();
      // const usersCollection = db.collection('users');

      usersCollection.doc(state.currentUser.uid).get().then(res => {
        if (res.data()) {
          commit('setUserProfile', res.data());
        } else {
          // create new user profile and save to DB
          let userProfile = createUserProfile();

          usersCollection.doc(state.currentUser.uid)
            .set(userProfile)
            .then(() => {
              commit('setUserProfile', userProfile);
            }).catch(err => {
              console.error('failed to create new user profile');
              console.error(err);
              throw err;
            });
        }
      }).catch(err => {
        console.error('failed to get user profile from DB');
        console.error(err);
        throw err;
      });
    },
    createNewProfile({commit, dispatch, state}, newSchemeName) {
      // alert('create new profile: ' + newProfileName);
      // create new schemeProfile
      let newScheme = createNewScheme(newSchemeName);
      schemesCollection.add(newScheme)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          newScheme.id = docRef.id;

          usersCollection.doc(state.currentUser.uid).update({
            schemes: firebase.firestore.FieldValue.arrayUnion({
              schemeId: docRef.id,
              schemeName: newSchemeName
            })
          }).then(() => {
            console.log('user profile updated');
            dispatch('fetchUserProfile');
          });

          //
        });
      // add scheme to userProfile
    },
    // method for debug only...
    // normally the store will be created once user login
    // however i like to recreate when chaning DB structure
    recreateUserProfile({commit, state}) {
      if (!state.currentUser) {
        throw new Error('Invalid state. fetch profile without user');
      }
      let userProfile = createUserProfile();

      usersCollection.doc(state.currentUser.uid)
        .set(userProfile)
        .then(() => {
          commit('setUserProfile', userProfile);
        });
    },
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    }
  }
};
