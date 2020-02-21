import Vue from 'vue';
import Vuex from 'vuex';
// import wishModule from './modules/wishItem';
import DummyModule from './modules/dummy';
import IDBDemo from './modules/idbDemo';

import firebase from 'firebase';

Vue.use(Vuex);

// console.log('create new store?');

export const store = new Vuex.Store({
  modules: {
    // wish: wishModule,
    dummy: DummyModule,
    localDbDemo: IDBDemo,
    dummyInline: {
      state: { someValue: 2 },
      actions: { inlineIncrement: ({commit}) => { commit('incrementValue2'); } },
      mutations: { incrementValue2(state) { state.someValue++; } }
    },
    profiles: {
      state: { profiles: [{ name: 'profile 1' }, { name: 'profile 2' }] },
    },
    dictionary: {
      state: { wordlist: [{ id: 0, name: 'profile 1' }, { id: 1, name: 'profile 2' }] },
    },
    auth: {
      state: {
        currentUser: null,
        userProfile: {}
      },
      actions: {
        fetchUserProfile({commit, state}) {
          if (!state.currentUser) {
            console.log('no user?');
          }
          const db = firebase.firestore();
          const usersCollection = db.collection('users');
          usersCollection.doc(state.currentUser.uid).get().then(res => {
            console.log(res);
            if (res.data()) {
              console.log(res.data);
              commit('setUserProfile', res.data());
            } else {
              let newProfile = {
                name: 'profile : ' + state.currentUser.displayName,
                title: 'Dummy title'
              };

              alert('no user data - create new?');
              usersCollection.doc(state.currentUser.uid)
                .set(newProfile)
                .then(() => {
                  console.log(res.data);
                  commit('setUserProfile', res.data());
                });
            }
          }).catch(err => {
            console.log(err);
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
    }
  }
});
