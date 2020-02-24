import Vue from 'vue';
import Vuex from 'vuex';

// vuex modules
import DummyModule from './modules/dummy';
import IDBDemo from './modules/idbDemo';
import profile from './modules/profiles';
import scheme from './modules/scheme';
import schemex from './modules/scheme/schemex';
import book from './modules/scheme/book';

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createLogger()]
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
    auth: profile,
    scheme: scheme,
    schemex: schemex,
    book: book,
  },
  // strict: process.env.NODE_ENV !== 'production'
});
