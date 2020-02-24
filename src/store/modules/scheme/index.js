// import firebase from 'firebase/app';
import firestore from '@/api/firebase/firebaseConfig';

const schemesCollection = firestore.schemesCollection;

function _createNewScheme(owner, schemeName) {
  return {
    owner: owner,
    schemeName: schemeName
    // subcollection ?
    // books: []
  };
};

export default {
  state: {
    // TODO: move this to local state
    currentScheme: null,
    // TODO: move this to local state
    booklist: []
    // here only store DB reference
  },
  getters: {
    getCurrentScheme: state => {
      alert('getCurrentScheme is Deprecated!');
      return state.currentScheme;
    },
  },
  actions: {
    /**
     * owner: userId
     */
    createNewScheme({dispatch, commit}, payload) {
      console.log('createNewScheme');
      return new Promise(
        (resolve, reject) => {
          let newScheme = _createNewScheme(payload.owner, payload.schemeName);
          console.log(newScheme);
          schemesCollection
            .add(newScheme)
            .then(ref => {
              console.log('addSchemeToUserProfile');
              console.log(ref);
              dispatch('addSchemeToUserProfile', ref);

              if (payload.isDefault) {
                dispatch('updateUserProfileSetDefaultScheme', ref.id)
                  .then(resolve(ref.id))
                  .catch(reject);
              } else {
                // reload userProfile or reload the new scheme?
                // dispatch('fetchUserProfile');
                dispatch('fetchScheme', ref.id)
                  .then(resolve(ref.id))
                  .catch(reject);
              }
            })
            .catch(err => {
              console.error(err);
              reject(err);
            });
        }
      );
    },
    fetchScheme({commit, state}, schemeId) {
      return new Promise((resolve, reject) => {
        if (!schemesCollection) reject(Error('DB not connected'));

        schemesCollection.doc(schemeId).get().then(doc => {
          resolve(doc.exists ? doc.data() : null);
        }).catch(reject);
      });

      // schemesCollection.doc(schemeId).get().then(res => {
      //   let scheme = res.data();
      //   if (scheme) {
      //     // store current scheme
      //     scheme.id = schemeId;
      //     commit('SET_CUREENT_SCHEME', scheme);

      //     // get sub-collection and add to booklist
      //     schemesCollection.doc(schemeId).collection('booklist').get().then(
      //       booklist => {
      //         commit('SET_BOOK_LIST',
      //           booklist.docs.map(item => ({
      //             id: item.id,
      //             ...item.data()
      //           })));
      //       });
      //   } else {
      //     console.log('No such scheme - DB not sync? ' + schemeId);
      //   }
      // }).catch(err => {
      //   console.error('unable to fetch scheme');
      //   console.error(err);
      //   throw err;
      // });
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
    addDummyBook({state, dispatch}) {
      const schemeId = state.currentScheme.id;
      schemesCollection.doc(schemeId).collection('booklist').add({
        name: 'this is a new dummy book'
      }).then(() => dispatch('fetchScheme', schemeId))
        .catch(err => alert('Oppps ' + err));
    }
  },
  mutations: {
    SET_CUREENT_SCHEME(state, value) {
      state.currentScheme = value;
    },
    SET_BOOK_LIST(state, value) {
      state.booklist = value;
    }
  }
};
