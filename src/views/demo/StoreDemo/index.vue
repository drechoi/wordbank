<template>
  <div>
    <navBar page-title="Store Demo" />
    <b-container>
      <b-container>
        <h4>Some value</h4>
        <p>
          {{ $store.state.dummy.someValue }}
          <b-button @click="test01">increment</b-button>
        </p>
      </b-container>
      <hr >
      <b-container>
        <h4>Some value 2</h4>
        <p>
          {{ $store.state.dummyInline.someValue }}
          <b-button @click="test03">increment</b-button>
        </p>
      </b-container>
      <hr >
      <b-container>
        <h4>Some List</h4>
        <ul>
          <li v-for="(listItem, index) in listItems" :key="index">
            {{ listItem }}
          </li>
        </ul>
        <b-button @click="test02">Add item</b-button>
      </b-container>
      <b-container>
        <h4>Raw</h4>
        <p>
          {{ $store.state.dummy }}
        </p>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      listItems: this.$store.state.dummy.someList,
    };
  },
  methods: {
    test01: function() {
      console.log('Commit increment');
      this.$store.commit('incrementValue');
      console.log('after Commit increment');
    },
    test02: function() {
      this.$store.commit('addItem');
    },
    test03: function() {
      this.$store.dispatch('inlineIncrement');
    }
  }
};

</script>
