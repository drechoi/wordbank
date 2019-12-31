import Vue from 'vue';
import Home from '@/views/HomeView';
import BootstrapVue from 'bootstrap-vue';
// import { shallowMount } from '@vue/test-utils';

// Install the authentication plugin here
Vue.use(BootstrapVue);

describe('Home.vue - Home View', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home);
    const vm = new Constructor().$mount();

    console.log(vm.$el.querySelector('ul'));

    console.log(vm.$el.querySelector('ul').innerHtml);

    expect(vm.$el.querySelector('.ul').textContent)
      .to.equal('Welcome to Your Vue.js App');

    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App');
  });
});

describe('Home 2', () => {
  // shallowMount(Home, {
  //   propsData: {
  //     maxStars: 6,
  //     grade: 3
  //   }
  // });
  // it('renders a list of stars with class `active` equal to prop.grade', () => {
  //   expect(wrapper.findAll('.active').length).toEqual(3);
  // });
});
