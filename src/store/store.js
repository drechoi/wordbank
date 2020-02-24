import Vue from 'vue';
import Vuex from 'vuex';
// import wishModule from './modules/wishItem';
import DummyModule from './modules/dummy';
import IDBDemo from './modules/idbDemo';

// import firebase from 'firebase/app';
import profile from './modules/profiles';
import scheme from './modules/scheme';
import book from './modules/scheme/book';
// import auth from './modules/auth';

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
    auth: profile,
    scheme: scheme,
    book: book,
  }
});
