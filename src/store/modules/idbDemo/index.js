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
    async getCats({commit}) {
      let cats = await idb.getCats();
      commit('refreshCatList', cats);
    },
    async saveCat({dispatch}, cat) {
      await idb.saveCat(cat);
      // commit change
      await dispatch('getCats');
    },
    async deleteCat({dispatch}, cat) {
      console.log('store: delete cat');
      await idb.deleteCat(cat);
      // commit change
      await dispatch('getCats');
    }
  }
};
