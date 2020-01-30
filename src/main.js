// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { store } from './store/store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import the plugin here
import BootstrapVue from 'bootstrap-vue';

import '../scss/custom.scss';

import ImageUploader from 'vue-image-upload-resize';

require('@/api/icons.js');

// Install the authentication plugin here
Vue.use(BootstrapVue);

Vue.component('font-awesome-icon', FontAwesomeIcon);

// Image uploader
Vue.use(ImageUploader);

Vue.config.productionTip = false;
Vue.prototype.$appName = 'Vue Template 01';

console.log('--- main start ---');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
