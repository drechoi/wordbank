import firebase from 'firebase';

function createUserProfile() {
  return {
    schemes: [],
    defaultScheme: null,
    settings: null,
  };
};

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

      const db = firebase.firestore();
      const usersCollection = db.collection('users');

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
    }
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
