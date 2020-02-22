<template>
  <div class="content">
    <b-alert v-model="showLoginError" variant="danger" dismissible>{{ loginError }}</b-alert>
    <h1>[App name]</h1>
    <div class="big_logo">[App big icon]</div>
    [icon] <b-button variant="outline-primary" @click="loginGoogle">Login with Google</b-button>
    [icon] <b-button variant="outline-primary" @click="loginFacebook">Login with Facebook</b-button>
  </div>
</template>

<script>
import firebase from 'firebase';
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
