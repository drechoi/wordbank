import firebase from 'firebase/app';
import firestore from '@/api/firebase/firebaseConfig';
import messages from '@/components/utils/message';
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
    // currentUser: null,
    userProfile: null,
  },
  getters: {
    // use this intead
    getUserId: state => {
      return state.userProfile ? state.userProfile.uid : null;
    },
    // getCurrentUserId: state => {
    //   alert('deprecated. use get user profile');
    //   return state.userProfile ? state.userProfile.uid : null;
    // },
    // getCurrentUser: state => {
    //   alert('deprecated. use get user profile');
    //   return state.userProfile;
    // },
    getUserProfile: state => state.userProfile,
  },
  actions: {
    fetchUserProfile({commit, dispatch, getters, state}, user) {
      return new Promise((resolve, reject) => {
        if (!user) {
          console.error('fetch user without user input!');
          // alert(messages.MSG_NO_USER);
          reject(Error('Invalid input. fetch profile without user'));
          return;
        }

        usersCollection.doc(user.uid).get().then(res => {
          if (res) {
            let userProfile = {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              ...res.data()
            };

            // instead of DB reference, change it to id
            userProfile.schemes = userProfile.schemes.map(
              scheme => {
                return scheme.id;
              }
            );
            // commit('SET_USER_PROFILE', {...user, ...userProfile});
            commit('SET_USER_PROFILE', userProfile);
            resolve(userProfile);
          } else {
            resolve(dispatch('createUserProfile'));
          }
        }).catch(err => {
          console.error(err);
          reject(err);
        });
      });
    },
    localLogout({commit}) {
      commit('SET_USER_PROFILE', null);
    },
    createUserProfile({commit, state, user}) {
      let userProfile = createUserProfile();

      usersCollection.doc(user.uid)
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
      return new Promise(
        (resolve, reject) => {
          // update DB
          usersCollection
            .doc(state.currentUser.uid)
            .update({ defaultScheme: schemeId })
            .then(() => {
              resolve();
            }).catch(err => {
              console.error(err);
              reject(err);
            });
        }
      );
    },
    addSchemeToUserProfile({getters}, scheme) {
      // TODO: remove this message later
      if (!getters.getUserId) {
        return Promise.reject(Error(messages.MSG_NO_USER));
      }

      return usersCollection.doc(getters.getUserId)
        .update({ schemes: firebase.firestore.FieldValue.arrayUnion(scheme) });
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
    SET_USER_PROFILE(state, val) {
      state.userProfile = val;
    }
  }
};
