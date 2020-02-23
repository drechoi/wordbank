import firebase from 'firebase';
import firestore from '@/api/firebase/firebaseConfig';

const booksCollection = firestore.booksCollection;

const createNewBook = (bookName) => {
  return {
    name: bookName,
    stickers: [],
    wishes: []
  };
};

const bookReference = (book) => {
  return {
    id: book.id,
    name: book.name
  };
};

export default {
  state: {
    currentBook: null,
  },
  actions: {
    addNewBook({state, dispatch}, bookName) {
      // add new book to current scheme
      // const currentScheme = state.getters.getCurrentScheme();
      let newBook = createNewBook(bookName);

      booksCollection.add(newBook).then(docRef => {
        newBook.id = docRef.id;

        const change = {
          books: firebase.firestore.FieldValue.arrayUnion(bookReference(newBook))
        };

        // update parent scheme
        dispatch('updateScheme', change);
      });
      // update DB collections
    },
    r({state, commit}) {
      commit('openBook', createNewBook());
    },
    u() {},
    d() {},
  },
  mutations: {
    openBook(state, book) {
      state.currentBook = book;
    }
  }
};
