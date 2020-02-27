import Vue from 'vue';
import customPlugin from '@/components/utils/mixin';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';

console.log('[helper-vuesetup] start');

Vue.use(Vuex);
Vue.use(customPlugin);
Vue.use(BootstrapVue);

console.log('[helper-vuesetup] end');
