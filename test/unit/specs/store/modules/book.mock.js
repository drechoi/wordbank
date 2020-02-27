import sinon from 'sinon';

export default {
  state: {
    currentBook: {
      id: '123',
      data: () => {
        return { name: '123' };
      }
    },
    books: []
  },
  actions: {
    // no longer auto fetch everything.. need to do externally
    addNewBook({getters, dispatch}, payload) {
    },
    fetchAllBooks({getters, dispatch}) {

    },
    // i dont think this function is needed,
    // there should be no use case for not using current scheme right?!
    fetchAllBooksBySchemeId({commit}, schemeId) {

    },
    fetchBookById({commit, getters}, bookId) {

    },
    updateBook({dispatch, getters}, payload) {
      console.log('updateBook');
      return Promise.resolve('done');
    },
    // updateBook: sinon.spy(),
    deleteBook({getters}, bookId) {

    }
  },
  getters: {
    getAllBooks: (state) => state.books,
    getCurrentBook: (state) => state.currentBook,
  },
  mutations: {
    SAVE_CURRENT_BOOK(state, bookSnapshot) {
      state.currentBook = bookSnapshot;
    },
    SAVE_BOOK_LIST(state, bookList) {
      state.books = bookList;
    }
  }
};
