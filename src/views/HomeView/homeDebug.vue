<template>
  <div>
    <navBar :page-title="pageTitle" />
    <div>
      <h1>Profile</h1>
      <ul>
        <li>Current Profile</li>
        <li>rename</li>
        <li>Profile selection</li>
        <li>add new</li>
        <li>remove</li>
      </ul>
      <b-container>
        [if no profile]
        -> create new
        <b-form-input v-model="newProfileName" placeholder="Enter new profile"></b-form-input>
        <b-button @click="createNewProfile">Create new profile</b-button>
        -> join request
      </b-container>
      <b-container>
        active profile
        {{ $store.state.auth.userProfile }}
      </b-container>
    <userCard :user="$store.state.auth.currentUser"/>
    </div>
    <hr >
    <div>
      <h1>Debug area</h1>
      <p>data: {{ dataDebug }}</p>
      <p>is logged in: {{ computedDebug }}</p>

      <b-button @click="resetDB">Reset DB</b-button>

      <p>store: {{ $store.state.auth.currentUser }}</p>
      <p>
        <userCard :user="$store.state.auth.currentUser"/>
      </p>

    </div>
    <hr >
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
import NavBar from '@/components/NavBar/navBarDebug';
import userCard from '@/components/userCard';
import firebase from 'firebase';

export default {
  components: {
    NavBar,
    userCard,
  },
  data() {
    return {
      pageTitle: '[page title]',
      listItems: this.$store.state.dummy.someList,
      dataDebug: '123213',
      newProfileName: '',
    };
  },
  computed: {
    computedDebug: () => firebase.auth().currentUser !== null,
    isLoggedIn: () => firebase.auth().currentUser !== null
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
    },
    resetDB: function() {
      this.$store.dispatch('recreateUserProfile');
    },
    createNewProfile: function(){
      this.$store.dispatch('createNewProfile', this.newProfileName);
    }
  }
};

</script>
