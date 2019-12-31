import Vue from 'vue';
import Vuex from 'vuex';
import wishModule from './modules/wishItem';
import DummyModule from './modules/dummy';
import IDBDemo from './modules/idbDemo';

Vue.use(Vuex);

// console.log('create new store?');

export const store = new Vuex.Store({
  modules: {
    wish: wishModule,
    dummy: DummyModule,
    localDbDemo: IDBDemo
  }
});
