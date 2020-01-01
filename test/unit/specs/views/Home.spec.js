import Vue from 'vue';
import Home from '@/views/HomeView';
import BootstrapVue from 'bootstrap-vue';
import { shallowMount } from '@vue/test-utils';

// Install the authentication plugin here
Vue.use(BootstrapVue);

describe('Home.vue - Home View', () => {
  const wrapper = shallowMount(Home);
  it('should render correct contents', () => {
    // which contains ..
    // 1 header
    expect(wrapper.find('h1').text()).to.equal('This is Home View');
    // 2 profile information (if any) .. or new profile..
    // 3 enter button .. existsing profile or profile list
    expect(wrapper.find('button').text()).to.equal('Enter');
  });

  // it('render a list of all router path', () => {
  //   wrapper.findAll('li').wrappers.forEach(w => console.log(w.html()));
  //   expect(wrapper.findAll('li').length).to.equal(12);
  // });
});
