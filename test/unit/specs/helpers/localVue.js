import { createLocalVue } from '@vue/test-utils';
import customPlugin from '@/components/utils/mixin';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(customPlugin);
localVue.use(BootstrapVue);

export default localVue;
