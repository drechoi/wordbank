// import Vue from 'vue';
import Vuex from 'vuex';
import { mount } from '@vue/test-utils';
// import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BookSettingView from '@/views/Book/Setting';
import localVue from '#/helpers/localVue';
import book from '#/store/modules/book.mock';
import sinon from 'sinon';
import storeOption from '@/store/store';

// require('#/helpers/VueSetup');

book.actions.updateBook = sinon.spy();
storeOption.modules.book = book;

const $store = new Vuex.Store(storeOption);

const mockRoute = {
  params: {
    id: '123'
  }
};

const mockRouter = {
  push: () => { console.log('mock router push'); },
  params: {
    id: '123'
  }
};

// const spyMounted = sinon.spy();
const vueOptions = {
  localVue,
  // mounted: () => { console.log('dummy'); },
  // context: {
  //   children: [b-button, Bar]
  // },
  mocks: {
    $route: mockRoute,
    $router: mockRouter,
    $store
  },
  stubs: ['font-awesome-icon', 'b-button'],
};

// describe('aother mount', () => {
//   const wrapper = mount(BookSettingView, vueOptions);
//   it('able to mount again', () => {
//     // wrapper.setData({isLoading: true});
//     console.log('wrapper.props()');
//     console.log(wrapper.vm.$data.isLoading);
//     expect(wrapper.vm.$data.isLoading).to.be.true;
//   });
// });

describe('Book setting page load / mount', () => {
  it('enter and exit loading state', async() => {
    let wrapper = mount(BookSettingView, vueOptions);
    expect(wrapper.vm.$data.isLoading).to.be.true;
    await flushPromises();
    expect(wrapper.vm.$data.isLoading).to.be.false;
  });

  describe('no result from db / store', () => {
    it('call router to redirect', async() => {
      $store.state.scheme.currentScheme = {
        name: 'dummy',
        id: 'DUMMY'
      };
      console.log('$store.getters.getCurrentScheme');
      console.log($store.getters.getCurrentScheme);
      console.log($store.state.scheme);
      let spy = sinon.spy();
      mockRouter.push = spy;
      mount(BookSettingView, vueOptions);
      await flushPromises();
      spy.should.have.been.called;
      spy.should.have.been.calledWith('/');
    });
  });

  // describe('with invalid book id', () => {
  //   it('call router to redirect', () => {
  //     mount(BookSettingView, vueOptions);
  //     expect(false);
  //   });
  // });

  // describe('with valid input', () => {
  //   it('call refresh page', () => {
  //     mount(BookSettingView, vueOptions);
  //     expect(false);
  //   });

  //   it('display correct information', () => {
  //     mount(BookSettingView, vueOptions);
  //     expect(false);
  //   });

  //   it('exit from loading state', () => {
  //     mount(BookSettingView, vueOptions);
  //     expect(false);
  //   });
  // });
});

describe('book information edited', () => {
  const wrapper = mount(BookSettingView, vueOptions);

  it('entered loading state', () => {
    wrapper.find('#btn-save').trigger('click');
    expect(book.actions.updateBook).to.have.been.called;
    expect(false).is.true;
  });

  it('exit loading state afterwards', () => {
    wrapper.find('#btn-save').trigger('click');
    expect(book.actions.updateBook).to.have.been.called;
    expect(false).is.true;
  });

  describe('with invalid input', () => {
    it('prompt message', () => {
      expect(false).is.true;
    });
  });

  describe('with valid input', () => {
    it('action triggered', () => {
      wrapper.find('#btn-save').trigger('click');
      expect(book.actions.updateBook).to.have.been.called;
      expect(false).is.true;
    });

    it('with correct input', () => {
      wrapper.find('#btn-save').trigger('click');
      expect(book.actions.updateBook).to.have.been.called;
      expect(false).is.true;
    });
  });
});
