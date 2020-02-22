import firebase from 'firebase';
import firestore from '@/api/firebase/firebaseConfig';

const schemesCollection = firestore.schemesCollection;

function createNewScheme(schemeName) {
  return {
    schemeName: schemeName,
    books: []
  };
};

export default {
  state: {
    currentScheme: null,
  },
  actions: {
    addNewScheme({commit, dispatch, state}, schemeName) {
      // alert('create new profile: ' + newProfileName);
      // create new schemeProfile
      let newScheme = createNewScheme(schemeName);
      schemesCollection.add(newScheme)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          newScheme.id = docRef.id;

          const change = {
            schemes: firebase.firestore.FieldValue.arrayUnion({
              schemeId: docRef.id,
              schemeName: schemeName
            })
          };
          dispatch('updateProfile', change);
        });
      // add scheme to userProfile
    },
    fetchScheme({commit, state}, schemeId) {
      console.log('fetch scheme' + schemeId);
      schemesCollection.doc(schemeId).get().then(res => {
        console.log('item from scheme' + schemeId);
        commit('setCurrentScheme', res.data());
      }).catch(err => {
        console.error('unable to fetch scheme');
        console.error(err);
        throw err;
      });
    }
  },
  mutations: {
    setCurrentScheme(state, value) {
      console.log(value);
      state.currentScheme = value;
    }
  }
};
