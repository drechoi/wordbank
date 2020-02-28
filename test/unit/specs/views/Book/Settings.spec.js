// import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BookSettingView from '@/views/Book/Setting';
import localVue from '#/helpers/localVue';
import sinon from 'sinon';

const PARAM_BOOK_ID = 'Dummy Book Id';

const mockRoute = {
  params: {
    id: PARAM_BOOK_ID
  }
};

const mockRouter = {};

const mocks = {
  $route: mockRoute,
  $router: mockRouter,
};

const shallowMountComponent = (storeOption, mocks) => {
  const store = new Vuex.Store(storeOption);
  return shallowMount(BookSettingView, { mocks, store, localVue });
};

describe('Book setting page', function() {
  describe('on load', function() {
    it('fetch will called', async function() {
      // const modules = {};
      const spy = sinon.spy();
      const modules = {book: {actions: { fetchBookById: spy }}};
      // modules.book.actions.fetchBookById = spy;

      const wrapper = shallowMountComponent({modules}, mocks);

      spy.should.have.been.called;
      expect(spy.getCall(0).args[1]).is.deep.equal(PARAM_BOOK_ID);
      expect(wrapper.vm.isLoading).is.true;
      await flushPromises();
      expect(wrapper.vm.isLoading).is.false;
    });

    describe('fetch data failure', function() {
      it('will call redirect', async function() {
        mocks.$router.push = sinon.spy();
        const modules = {book: {actions: { fetchBookById: () => { return Promise.reject(Error('test reject')); } }}};
        shallowMountComponent({modules}, mocks);

        await flushPromises();

        expect(mocks.$router.push).have.been.called;
        expect(mocks.$router.push).have.been.calledWith('/');
      });
    });

    describe('fetch valid data', function() {
      const dummyBook = {
        id: 'dummy book id',
        data: () => {
          return {
            name: 'dummy book name'
          };
        }
      };

      beforeEach(function() {
        const modules = {book: {actions: { fetchBookById: () => { return Promise.resolve(dummyBook); } }}};
        this.currentTest.wrapper = shallowMountComponent({modules}, mocks);
      });

      it('will Enter and exit loading state', async function() {
        expect(this.test.wrapper.vm.isLoading).is.true;
        await flushPromises();
        expect(this.test.wrapper.vm.isLoading).is.false;
      });

      it('will update content', async function() {
        await flushPromises();
        expect(this.test.wrapper.vm.currentBook.id).is.equal(dummyBook.id);
        expect(this.test.wrapper.vm.currentBook.name).is.equal(dummyBook.data().name);
      });

      it('will show correct information in the input placeholder', async function() {
        await flushPromises();
        expect(this.test.wrapper.find('#input-name').props('placeholder')).is.equal(dummyBook.data().name);
      });
    });
  });

  describe('on save click', function() {
    const dummyBook = {
      id: 'dummy book id',
      data: () => {
        return {
          name: 'dummy book name'
        };
      }
    };

    // TODO: validate input before call action
    describe('with valid input', function() {
      const dummyTextInput = 'dummyTextInput';
      const StubBtn = { template: `<button @click='$listeners.click'></button>` };

      beforeEach(function() {
        // mount page..
        this.currentTest.spy = sinon.spy();
        const modules = {book: {actions: {
          fetchBookById: () => { return Promise.resolve(dummyBook); },
          updateBook: this.currentTest.spy
        }}};

        const store = new Vuex.Store({modules});
        const wrapper = shallowMount(BookSettingView, { mocks, store, stubs: { 'b-button': StubBtn }, localVue });
        this.currentTest.wrapper = wrapper;

        wrapper.setData({editName: dummyTextInput});
        // // click
        wrapper.find(StubBtn).trigger('click');
      });

      it('action will triggered updateBook action', function() {
        this.test.spy.should.have.been.called;
        expect(this.test.spy.getCall(0).args[1]).is.deep.equal({ name: dummyTextInput });
      });

      it('will reset the input form', async function() {
        await flushPromises();
        expect(this.test.wrapper.find('#input-name').props('value')).is.deep.equal('');
      });
    });
  });
});
