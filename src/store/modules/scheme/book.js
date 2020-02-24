// import firebase from 'firebase/app';
import firestore from '@/api/firebase/firebaseConfig';

// const booksCollection = firestore.booksCollection;
const schemesCollection = firestore.schemesCollection;

const createNewBook = (bookName) => {
  return {
    name: bookName,
    stickers: [],
    wishes: []
  };
};

export default {
  state: {
    currentBook: null,
    books: []
  },
  actions: {
    addNewBook({state, dispatch}, payload) {
      // add new book to current scheme
      // const currentScheme = state.getters.getCurrentScheme();
      return new Promise(
        (resolve, reject) => {
          const newBook = createNewBook(payload.bookName);
          const schemeId = payload.schemeId;
          const booksCollection = schemesCollection.doc(schemeId).collection('book');

          booksCollection.add(newBook).then(bookRef => {
            dispatch('fetchAllBooksBySchemeId', schemeId).then(
              () => resolve(bookRef)
            );
          }).catch(reject);
        }
      );
    },
    fetchAllBooksBySchemeId({state, commit}, schemeId) {
      return new Promise(
        (resolve, reject) => {
          schemesCollection.doc(schemeId).collection('book').get().then(bookRef => {
            for (let bookDoc in bookRef.docs) {
              console.log(bookDoc);
            }
            commit('SAVE_BOOK_LIST', bookRef.docs);
            resolve(bookRef.docs);
          }).catch(resolve);
        }
      );
    },
    u() {},
    d() {},
  },
  getters: {
    getAllBooks: (state) => state.books,
  },
  mutations: {
    openBook(state, book) {
      state.currentBook = book;
    },
    SAVE_BOOK_LIST(state, bookList) {
      state.books = bookList;
    }
  }
};
