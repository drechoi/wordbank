import Vue from 'vue';
import BookSettingView from '@/views/Book/Setting';
import BootstrapVue from 'bootstrap-vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import allRoutes from '@/router/AllRoutes';
// import book1 from '@/store/modules/mock';
import Layout from '@/components/Layout';

import book from '../../store/modules/book.mock';
import sinon from 'sinon';
import Vuex from 'vuex';
// import store from '@/store/store';

const storeOption =
{
  // plugins: [createLogger()]
  modules: {
    book: book
  }
};

const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon);

localVue.use(Vuex);
const mockStore = new Vuex.Store(storeOption);

const vueOption = {
  localVue,
  mocks: {
    $route: {
      params: {
        id: '123'
      }
    }
  },
  // stubs: ['globally-registered-component'],
  store: mockStore,
};

// Install the authentication plugin here
Vue.use(BootstrapVue);

describe('Book setting view', () => {
  const wrapper = shallowMount(BookSettingView, vueOption);
  it('render a book name computed from mounted ', () => {
    // console.log(wrapper.findAll('b-link'));
    // const wapperBook = wrapper.find('.currentBook');
    console.log(wrapper.attributes());
    console.log(wrapper.classes());
    console.log(wrapper);
    console.log(wrapper.exists());
    console.log(wrapper.find('button'));
    console.log(wrapper.find('btn-save'));

    console.log(wrapper.contains(Layout));
    console.log(wrapper.find(Layout).attributes());
    console.log(wrapper.find('#btn-save'));

    console.log('basicInfoSave: ' + wrapper.contains('basicInfoSave'));
    console.log(mockStore._actions.updateBook);

    // console.log(wapperBook.attributes());
    // console.log(wrapper.find('.currentBook.name'));
    // console.log(wrapper.find('.bookId'));
    // expect(wrapper.contains('b-input')).to.be.true;
    // expect(wrapper.find('.currentBook.name').text()).toBe('Caitlyn');
  });

  it('[TODO] on mounted, fetched data from store, display nicely', () => {});

  it('[TODO] on save button click, dispatch action triggered', () => {
    expect(wrapper.contains('#btn-save')).to.be.true;
    mockStore._actions.updateBook = sinon.stub();
    wrapper.find('#btn-save').trigger('click');
    // const spy = spyOn(wrapper.vm, 'addService');

    // expect(mockStore._actions.updateBook.called).to.be.true;
  });
});
