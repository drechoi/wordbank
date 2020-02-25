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
        <b-nav-item to="/scheme" active-class="active" exact>Home</b-nav-item>
        <b-nav-item to="/bookList" active-class="active" exact>All Books</b-nav-item>
        <b-nav-item-dropdown>
          <template v-slot:button-content>
            <userCard :user="$store.getters.getCurrentUser" style="display: inline-block"/>
          </template>
          <b-dropdown-item to="/UserSettings">
            <font-awesome-icon icon="cog" />Setting
          </b-dropdown-item>
          <b-dropdown-item @click="logout"><font-awesome-icon icon="sign-out-alt" />Logout</b-dropdown-item>
        </b-nav-item-dropdown>
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
  computed: {
    isAuthenticated: () => firebase.auth().currentUser !== null,
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/login');
        this.$store.commit('SET_CURRENT_USER', null);
      }).catch(err => {
        console.log(err);
      });
    },
  }
};
</script>
