// import firebase from 'firebase/app';
import firestore from '@/api/firebase/firebaseConfig';

// const booksCollection = firestore.booksCollection;
const schemesCollection = firestore.schemesCollection;
const COLLECTION_NAME = 'book';

const MSG_NO_SCHEME = 'no scheme';
const MSG_NO_BOOK = 'no book';

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
    // no longer auto fetch everything.. need to do externally
    addNewBook({getters, dispatch}, payload) {
      // add new book to current scheme
      return new Promise(
        (resolve, reject) => {
          const currentScheme = getters.getCurrentScheme;
          if (!currentScheme) {
            reject(Error(MSG_NO_SCHEME));
            return;
          }

          const newBook = createNewBook(payload.bookName);
          const schemeId = currentScheme.id;
          const booksCollection = schemesCollection.doc(schemeId).collection(COLLECTION_NAME);

          booksCollection.add(newBook).then(resolve, reject);
        }
      );
    },
    fetchAllBooks({getters, dispatch}) {
      return new Promise((resolve, reject) => {
        const scheme = getters.getCurrentScheme;
        if (!scheme) {
          reject(Error(MSG_NO_SCHEME));
          return;
        }

        dispatch('fetchAllBooksBySchemeId', scheme.id).then(resolve).catch(reject);
      });
    },
    // i dont think this function is needed,
    // there should be no use case for not using current scheme right?!
    fetchAllBooksBySchemeId({commit}, schemeId) {
      return new Promise(
        (resolve, reject) => {
          schemesCollection.doc(schemeId).collection(COLLECTION_NAME).get().then(bookRef => {
            commit('SAVE_BOOK_LIST', bookRef.docs);
            resolve(bookRef.docs);
          }, reject);
        }
      );
    },
    fetchBookById({commit, getters}, bookId) {
      return new Promise(
        (resolve, reject) => {
          const currentScheme = getters.getCurrentScheme;
          if (!currentScheme) {
            reject(MSG_NO_SCHEME);
            return;
          }

          schemesCollection.doc(currentScheme.id).collection(COLLECTION_NAME).doc(bookId).get().then(
            snapshot => {
              console.log('fetchBookById');
              console.log(snapshot);
              if (!snapshot) {
                reject(MSG_NO_BOOK);
                return;
              }
              commit('SAVE_CURRENT_BOOK', snapshot);
              resolve(snapshot);
            }, reject);
        });
    },
    updateBook({dispatch, getters}, payload) {
      return new Promise((resolve, reject) => {
        if (getters.getCurrentBook) {
          const bookId = getters.getCurrentBook.id;
          const docRef = schemesCollection.doc(getters.getCurrentScheme.id).collection(COLLECTION_NAME).doc(bookId);
          docRef.update(payload).then(ref => {
            // there is nothing return from update
            // this should be success
            console.log('updateBook');
            console.log(ref);
            dispatch('fetchBookById', bookId).then(resolve, reject);
          }).catch(reject);
        } else {
          reject(Error(MSG_NO_BOOK));
        }
      });
    },
    deleteBook({getters}, bookId) {
      const docRef = schemesCollection.doc(getters.getCurrentScheme.id).collection(COLLECTION_NAME).doc(bookId);
      return new Promise((resolve, reject) => {
        if (!getters.getCurrentScheme) reject(MSG_NO_SCHEME);

        docRef.delete().then(resolve, reject);
      });
    }
  },
  getters: {
    getAllBooks: (state) => state.books,
    getCurrentBook: (state) => state.currentBook,
  },
  mutations: {
    SAVE_CURRENT_BOOK(state, bookSnapshot) {
      console.log('mutation save book');
      console.log(bookSnapshot);
      console.log(state);
      state.currentBook = bookSnapshot;
    },
    SAVE_BOOK_LIST(state, bookList) {
      state.books = bookList;
    }
  }
};
