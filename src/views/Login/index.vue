<template>
  <div class="content">
    <b-alert v-model="showLoginError" variant="danger" dismissible>{{ loginError }}</b-alert>
    <h1>My Sticker Book</h1>
    <div class="big_logo"><b-img src="/static/logo.png" alt="icon" /></div>
    <b-button variant="outline-primary" @click="loginGoogle">
      <font-awesome-icon :icon="['fab', 'google']" /> Login with Google
    </b-button>
    <b-button variant="outline-primary" @click="loginFacebook">
      <font-awesome-icon :icon="['fab', 'facebook-square']" />
      Login with Facebook
    </b-button>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loginError: '',
      debug: ''
    };
  },
  computed: {
    ...mapState(['currentUser']),
    showLoginError: { get() { return this.loginError !== ''; } }
  },
  mounted() {
    if (this.$store.getters.getUserProfile) {
      this.$router.push('/home');
    }
  },
  methods: {
    loginGoogle() {
      this.socialLogin(new firebase.auth.GoogleAuthProvider());
    },
    loginFacebook() {
      this.socialLogin(new firebase.auth.FacebookAuthProvider());
    },
    // TODO: move it somewhere, no one call this.. maybe move it to navbar
    logout() {
      firebase.auth.signOut().then(() => {
        this.$router.push('/login');
      }).catch(err => {
        console.log(err);
      });
    },
    socialLogin(provider) {
      firebase.auth().signInWithPopup(provider).then(
        (result) => {
          // TODO: see any callback or target URL
          this.$router.push('/home');
        },
        err => {
          this.loginError = err;
        }
      ).catch(err => {
        this.loginError = 'Err: ' + err;
      });
    }
  }

};
</script>

<style>
.content {
  text-align: center;
}

.big_logo {
  margin: 10px;
}
</style>
