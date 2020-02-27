// import Vue from 'vue';
import DebugView from '@/views/DebugView';
import BootstrapVue from 'bootstrap-vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import allRoutes from '@/router/AllRoutes';

// Install the authentication plugin here
const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Home.vue - Home View', () => {
  const wrapper = shallowMount(DebugView, {
    localVue,
    stubs: ['globally-registered-component']
  });
  it('render a list of all router path', () => {
    // wrapper.findAll('li').wrappers.forEach(w => console.log(w.html()));
    expect(wrapper.findAll('li').length).to.equal(allRoutes.length);
  });
});
