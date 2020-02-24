import firebase from 'firebase';
import firestore from '@/api/firebase/firebaseConfig';
// const firestore = require('@/api/firebase/firebaseConfig');

function createUserProfile() {
  return {
    schemes: null,
    defaultScheme: null,
    settings: null,
  };
};

const usersCollection = firestore.usersCollection;
// const schemesCollection = firestore.schemesCollection;

export default {
  state: {
    currentUser: null,
    userProfile: null,
  },
  getters: {
    getCurrentUserId: state => state.currentUser ? state.currentUser.uid : null,
    getCurrentUser: state => state.currentUser,
    getUserProfile: state => state.userProfile,
  },
  actions: {
    fetchUserProfile({commit, dispatch, getters, state}) {
      if (!getters.getCurrentUser) {
        throw new Error('Invalid state. fetch profile without user');
      }

      usersCollection.doc(state.currentUser.uid).get().then(res => {
        console.log('fetchUserProfile');
        console.log(res);
        console.log(res.data());
        let userProfile = res.data();
        // little bit transformation coz schemes stored reference
        userProfile.schemes = userProfile.schemes.map(scheme => {
          console.log('scheme');

          console.log(scheme);
          console.log(scheme.data);
          console.log(scheme.ref);
          console.log(scheme.doc);
          console.log(scheme.get);
          return scheme.id;
        });

        if (userProfile) {
          commit('SET_USER_PROFILE', userProfile);

          // fetch defaultScheme
          if (userProfile.defaultScheme) dispatch('fetchScheme', userProfile.defaultScheme);
        } else {
          // create new user profile and save to DB
          dispatch('createUserProfile');
        }
      }).catch(err => {
        console.error('failed to get user profile from DB');
        console.error(err);
        throw err;
      });
    },
    createUserProfile({commit, state}) {
      let userProfile = createUserProfile();

      usersCollection.doc(state.currentUser.uid)
        .set(userProfile)
        .then(() => {
          commit('SET_USER_PROFILE', userProfile);
        }).catch(err => {
          console.error('failed to create new user profile');
          console.error(err);
          throw err;
        });
    },
    updateUserProfileSetDefaultScheme({dispatch, state}, schemeId) {
      console.log('updateUserProfileSetDefaultScheme: ' + schemeId);

      // update DB
      usersCollection
        .doc(state.currentUser.uid)
        .update({ defaultScheme: schemeId })
        .then(() => {
          // reload profile

          dispatch('fetchUserProfile');
        }).catch(err => {
          console.log('failed to update user profile');
          console.log(err);
        });
    },
    addSchemeToUserProfile({getters, dispatch}, schemeDocRef) {
      console.log('addSchemeToUserProfile: ');
      console.log(schemeDocRef);
      return new Promise((resolve, reject) => {
        usersCollection.doc(getters.getCurrentUserId)
          .update({ schemes: firebase.firestore.FieldValue.arrayUnion(schemeDocRef) })
          .then(docRef => {
            dispatch('fetchUserProfile')
              .then(resolve(docRef.id))
              .catch(reject);
          })
          .catch(err => reject(err));
      });
    },
    updateProfile({dispatch, state}, updates) {
      alert('function [updateProfile] is obsoleted');
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
          commit('SET_USER_PROFILE', userProfile);
        });
    },
  },
  mutations: {
    SET_CURRENT_USER(state, val) {
      state.currentUser = val;
    },
    SET_USER_PROFILE(state, val) {
      state.userProfile = val;
    }
  }
};
