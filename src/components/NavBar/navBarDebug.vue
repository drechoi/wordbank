<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="primary">
    <b-navbar-toggle target="nav_collapse" />
    <b-navbar-brand to="/">
      <b-img src="/static/favicon.png" height="30" alt="icon" />
      {{ pageTitle }}
    </b-navbar-brand>

    <b-collapse id="nav_collapse" is-nav>
      <b-navbar-nav v-if="isAuthenticated">
        <b-nav-item to="/HomeDebug" active-class="active" exact>Sticker Book</b-nav-item>
        <b-nav-item to="/Home" active-class="active" exact>Word bank</b-nav-item>
        <b-nav-item-dropdown>
          <template v-slot:button-content>
            <userCard :user="$store.state.auth.currentUser" style="display: inline-block"/>
          </template>
          <b-dropdown-item variant="secondary">Setting</b-dropdown-item>
          <b-dropdown-item>Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav v-else>
        <b-nav-item to="/" active-class="active" exact>Home 2</b-nav-item>
        <b-nav-item to="/showData" active-class="active" exact>Feed [later] 3</b-nav-item>
        <b-nav-item to="/user" active-class="active">My little adventurer4</b-nav-item>
        <b-nav-item to="/wishList" active-class="active" exact>Wish List5</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import firebase from 'firebase/app';
import userCard from '../userCard';

export default {
  components: {
    userCard,
  },
  props: {
    pageTitle: {
      type: String,
      default: null,
    }
  },
  data() {
    return {

    };
  },
  computed: {
    isAuthenticated: () => firebase.auth().currentUser !== null,
  },
  methods: {
  }
};
</script>
