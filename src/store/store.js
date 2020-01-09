import Vue from 'vue';
import Vuex from 'vuex';
// import wishModule from './modules/wishItem';
import DummyModule from './modules/dummy';
import IDBDemo from './modules/idbDemo';

Vue.use(Vuex);

// console.log('create new store?');

export const store = new Vuex.Store({
  modules: {
    // wish: wishModule,
    dummy: DummyModule,
    localDbDemo: IDBDemo,
    dummyInline: {
      state: { someValue: 2 },
      actions: { inlineIncrement: ({commit}) => { commit('incrementValue2'); } },
      mutations: { incrementValue2(state) { state.someValue++; } }
    },
    profiles: {
      state: { profiles: [{ name: 'profile 1' }, { name: 'profile 2' }] },
    },
    dictionary: {
      state: { wordlist: [{ id: 0, name: 'profile 1' }, { id: 1, name: 'profile 2' }] },
    },

  }
});
