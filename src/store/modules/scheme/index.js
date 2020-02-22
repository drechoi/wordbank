// import firebase from 'firebase';
import firestore from '@/api/firebase/firebaseConfig';

const schemesCollection = firestore.schemesCollection;

function _createNewScheme(owner, schemeName) {
  return {
    owner: owner,
    users: [],
    schemeName: schemeName
    // subcollection ?
    // books: []
  };
};

export default {
  state: {
    currentScheme: null,
  },
  actions: {
    /**
     * owner: userId
     */
    createNewScheme({dispatch, commit}, payload) {
      let newScheme = _createNewScheme(payload.owner, payload.schemeName);
      console.log(newScheme);
      schemesCollection
        .add(newScheme)
        .then(ref => {
          console.log(ref);
          if (payload.isDefault) {
            dispatch('updateUserProfileSetDefaultScheme', ref.id);
          } else {
            // reload userProfile or reload the new scheme?
            // dispatch('fetchUserProfile');
            dispatch('fetchScheme', ref.id);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    addNewScheme({commit, dispatch, state}, schemeName) {
      alert('function [addNewScheme] is obsoleted');
    },
    fetchScheme({commit, state}, schemeId) {
      schemesCollection.doc(schemeId).get().then(res => {
        let scheme = res.data();
        if (scheme) {
          // get sub-collection and add to booklist
          schemesCollection.doc(schemeId).collection('booklist').get().then(
            booklist => {
              scheme.books = booklist.docs
                .map(item => ({
                  id: item.id,
                  ...item.data()
                }));
              commit('SET_CUREENT_SCHEME', scheme);
            });
        }
      }).catch(err => {
        console.error('unable to fetch scheme');
        console.error(err);
        throw err;
      });
    },
    // is it too generic?
    updateScheme({dispatch, state}, delta) {
      alert('updateScheme is obsoleted');
      // get current scheme
      const schemeId = state.currentScheme.id;
      schemesCollection.doc(schemeId).update(delta).then(
        () => dispatch('fetchScheme', schemeId)
      );
    }
  },
  mutations: {
    SET_CUREENT_SCHEME(state, value) {
      console.log(value);
      state.currentScheme = value;
    }
  }
};
