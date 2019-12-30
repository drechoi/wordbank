export default {
  state: {
    someValue: 1,
    someList: [
      {
        id: 1,
        name: 'testing item 01',
        value: 1
      },
      {
        id: 2,
        name: 'testing item 02',
        value: 2
      }
    ]
  },
  actions: {
    test() {
    }
  },
  mutations: {
    changeValue(state, someValue) {
      state.someValue = someValue;
    },
    incrementValue(state) {
      state.someValue++;
    },
    addItem(state) {
      console.log(state.listItemCount);
      var tmp = state.someList.length + 1;
      state.someList.push(Object.freeze({
        id: tmp,
        name: 'dummy',
        value: tmp
      }));
    }
  },
  getters: {
    someValueMinusTen: state => { return state.someValue - 10; },
    listItemCount: state => { return state.someList.length; }
  }
};
