import idb from '@/api/idb';

export default {
  state: {
    cats: []
  },
  mutations: {
    refreshCatList(state, cats) {
      state.cats = cats;
    }
  },
  actions: {
    async getCats({commit, db}) {
      let cats = await idb.catRepo.getAll(db);
      commit('refreshCatList', cats);
    },
    async saveCat({dispatch}, cat, db) {
      await idb.catRepo.update(db, cat);
      console.log(idb);
      // commit change
      await dispatch('getCats');
    },
    async deleteCat({dispatch}, cat, db) {
      console.log('store: delete cat');
      await idb.catRepo.deleteCat(db, cat);
      // commit change
      await dispatch('getCats');
    }
  }
};
