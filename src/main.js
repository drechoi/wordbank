// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import the plugin here
import BootstrapVue from 'bootstrap-vue';

import '../scss/blackAndWhite.scss';

import ImageUploader from 'vue-image-upload-resize';

// firebase setup
import firebase from '@/api/firebase/firebaseConfig.js';

require('@/api/icons.js');

// Install the authentication plugin here
Vue.use(BootstrapVue);

Vue.component('font-awesome-icon', FontAwesomeIcon);

// Image uploader
Vue.use(ImageUploader);

Vue.config.productionTip = false;
Vue.prototype.$appName = 'Vue Template 01';
console.log('--- starting App ---');
/* eslint-disable no-new */

firebase.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('SET_CURRENT_USER', user);
    store.dispatch('fetchUserProfile');
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
