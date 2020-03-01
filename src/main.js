// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';

// import plug-ins
import router from './router';
import store from './store/store';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
// firebase setup
import firebase from '@/api/firebase/firebaseConfig';
// import '@/api/firebase/firebaseConfig';
import customPlugin from '@/components/utils/mixin';
import '../scss/blackAndWhite.scss';
import '@/api/icons.js';

// TODO: remove this plug-in..
import ImageUploader from 'vue-image-upload-resize';

// all plugin here
Vue.use(BootstrapVue);
Vue.use(customPlugin);
Vue.use(VueRouter);
Vue.use(Vuex);

// TODO: to be remove later
Vue.use(ImageUploader);

// App config
Vue.config.productionTip = false;
Vue.prototype.$appName = 'Vue Template 01';
console.log('--- starting App ---');
/* eslint-disable no-new */

firebase.auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch('fetchUserProfile', user);
  } else {
    store.dispatch('localLogout');
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

// let app;
// console.log('--- main start with firebase ---');
// firebase.auth.onAuthStateChanged(
//   user => {
//     if (!app) {
//       app = new Vue({
//         el: '#app',
//         router,
//         store,
//         components: { App },
//         template: '<App/>'
//       });
//     }
//   }
// );
