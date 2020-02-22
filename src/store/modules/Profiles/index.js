// import firebase from 'firebase';
import firestore from '@/api/firebase/firebaseConfig';
// const firestore = require('@/api/firebase/firebaseConfig');

function createUserProfile() {
  return {
    schemes: [],
    defaultScheme: null,
    settings: null,
  };
};

// function createNewScheme(schemeName) {
//   return {
//     schemeName: schemeName,
//     books: []
//   };
// };

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
        if (res.data()) {
          let userProfile = res.data();
          commit('setUserProfile', userProfile);
          console.log('fetch scheme after user profile');
          // fetch default or first scheme
          if (userProfile.defaultScheme) {
            console.log('default');
            dispatch('fetchScheme', userProfile.defaultScheme);
          } else if (userProfile.schemes && userProfile.schemes.length > 0) {
            console.log('fist item' + userProfile.schemes[0].schemeId);
            dispatch('fetchScheme', userProfile.schemes[0].schemeId);
          }
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
          commit('setUserProfile', userProfile);
        }).catch(err => {
          console.error('failed to create new user profile');
          console.error(err);
          throw err;
        });
    },
    updateProfile({dispatch, state}, updates) {
      usersCollection.doc(state.currentUser.uid)
        .update(updates)
        .then(() => {
          console.log('user profile updated');
          dispatch('fetchUserProfile');
        });
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
