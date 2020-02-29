// import firebase from 'firebase/app';
import firestore from '@/api/firebase/firebaseConfig';
import messages from '@/components/utils/message';
const schemesCollection = firestore.schemesCollection;

function _createNewScheme(owner, schemeName) {
  if (!owner || schemeName) throw Error('Invalid Scheme');

  return {
    owner: owner,
    schemeName: schemeName
  };
};

export default {
  state: {
    currentScheme: null,
  },
  getters: {
    getCurrentScheme: state => {
      return state.currentScheme;
    },
  },
  actions: {
    /**
     * owner: userId
     */
    createNewScheme({dispatch, commit}, payload) {
      return new Promise(
        (resolve, reject) => {
          const newScheme = _createNewScheme(payload.owner, payload.schemeName);

          schemesCollection
            .add(newScheme)
            .then(ref => {
              dispatch('addSchemeToUserProfile', ref.id);

              if (payload.isDefault) {
                dispatch('updateUserProfileSetDefaultScheme', ref.id)
                  .then(resolve(ref.id))
                  .catch(reject);
              } else {
                resolve(ref.id);
              }
            })
            .catch(err => {
              console.error(err);
              reject(err);
            });
        }
      );
    },
    fetchScheme({commit, dispatch}, schemeId) {
      return new Promise((resolve, reject) => {
        if (!schemeId || !schemesCollection) reject(Error(messages.MSG_NO_SCHEME));

        schemesCollection.doc(schemeId).get()
          .then(doc => {
            if (doc.exists) {
              let scheme = doc.data();
              scheme.id = schemeId;
              commit('SET_CUREENT_SCHEME', scheme);

              // is it a side effect?
              // or logically they should be a package?
              // as mutation is sychronize, just call fetchAllBook
              dispatch('fetchAllBooks')
                .then(() => resolve(doc.data()));
            } else {
              reject(Error(messages.MSG_NO_SCHEME));
            }
          })
          .catch(reject);
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
    },
  },
  mutations: {
    SET_CUREENT_SCHEME(state, value) {
      state.currentScheme = value;
    },
  }
};
