import idb from '@/api/idb';

export default {
  state: {
    wordList: [],
  },
  mutations: {
    reloadWordList(state, wordList) {
      state.wordList = wordList;
    }
  },
  actions: {
    getWordList({commit}) {
      idb.wordRepository.getAll().then(
        (wordList) => {
          commit('reloadWordList', wordList);
        },
        (err) => {
          console.log('failed to reload word list');
          console.log(err);
        }
      );
    },
    addNewProfile({dispatch}, newWord) {
      idb.wordRepository.add(newWord).then(
        () => { dispatch('getWordList'); }
      );
    },
    deleteProfile({dispatch}, id) {
      idb.wordRepository.delete(id).then(
        () => { dispatch('getWordList'); }
      );
    },
  }
};
