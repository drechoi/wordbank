// import firebase from 'firebase';
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
    userProfile: {}
  },
  actions: {
    fetchUserProfile({commit, dispatch, state}) {
      if (!state.currentUser) {
        throw new Error('Invalid state. fetch profile without user');
      }

      usersCollection.doc(state.currentUser.uid).get().then(res => {
        let userProfile = res.data();

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
      console.log('updateUserProfileSetDefaultScheme' + schemeId);
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
    // updateSchemeRefInUserProfile({dispatch, state}, scheme) {
    //   const itemKey = 'schemes.' + scheme.id;
    //   const itemValue = {
    //     schemeId: scheme.id,
    //     schemeName: scheme.Name
    //   };
    //   console.log('updateSchemeRefInUserProfile' + itemKey);
    //   usersCollection.doc(state.currentUser.uid).update({[itemKey]: itemValue});
    // },

    updateProfile({dispatch, state}, updates) {
      alert('function [updateProfile] is obsoleted');
      // usersCollection.doc(state.currentUser.uid)
      //   .update(updates)
      //   .then(() => {
      //     console.log('user profile updated');
      //     dispatch('fetchUserProfile');
      //   });
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
