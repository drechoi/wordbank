// import firebase from 'firebase/app';
import firestore from '@/api/firebase/firebaseConfig';

// const booksCollection = firestore.booksCollection;
const schemesCollection = firestore.schemesCollection;
const COLLECTION_NAME = 'book';

// TODO: decide whether snapshot or reference is storing
const METHOD_SNAPSHOT = 0;
const METHOD_REFERENCE = 1;
const storingMethod = METHOD_REFERENCE;

const MSG_NO_SCHEME = 'no scheme';

const createNewBook = (bookName) => {
  return {
    name: bookName,
    stickers: [],
    wishes: []
  };
};

export default {
  state: {
    currentBookReference: null,
    currentBookSnapshot: null,
    books: []
  },
  actions: {
    addNewBook({getters, dispatch}, payload) {
      // add new book to current scheme
      return new Promise(
        (resolve, reject) => {
          const currentScheme = getters.getCurrentScheme();
          if (!currentScheme) {
            reject(Error(MSG_NO_SCHEME));
            return;
          }

          const newBook = createNewBook(payload.bookName);
          const schemeId = currentScheme.id;
          const booksCollection = schemesCollection.doc(schemeId).collection(COLLECTION_NAME);

          booksCollection.add(newBook).then(bookRef => {
            dispatch('fetchAllBooksBySchemeId', schemeId).then(
              () => resolve(bookRef)
            );
          }).catch(reject);
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
          }).catch(reject);
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
            bookRef => {
              resolve(bookRef.data());
              commit('SAVE_CURRENT_BOOK', bookRef);
            }
          ).catch(
            reject
          );
        });
    },
    updateBook({commit, getters}, payload) {
      console.log('updateBook');
      return new Promise((resolve, reject) => {
        console.log('get current book');
        if (getters.getCurrentBook) {
          getters.getCurrentBook.save(payload).then(ref => {
            commit('SAVE_CURRENT_BOOK', ref);
            resolve(ref);
          }).catch(reject);
        } else {
          console.log(getters);
          console.log(getters.getCurrentBook);
          reject(Error('no book'));
        }
      });
    },
    u() {},
    d() {},
  },
  getters: {
    getAllBooks: (state) => state.books,
    getCurrentBook: (state) => {
      if (storingMethod === METHOD_SNAPSHOT) {
        return state.currentBookSnapshot;
      } else {
        return state.currentBookReference ? state.currentBookReference.data() : null;
      }
    }
  },
  mutations: {
    SAVE_CURRENT_BOOK(state, bookReference) {
      // store the reference
      this.currentBookReference = bookReference;
      let snapshot = bookReference.data();
      snapshot.id = bookReference.id;
      // store the snapshot
      this.currentBookSnapshot = snapshot;
    },
    SAVE_BOOK_LIST(state, bookList) {
      state.books = bookList;
    }
  }
};
