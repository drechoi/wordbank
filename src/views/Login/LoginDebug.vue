<template>
  <div class="content">
    <h1>[App Title]</h1>
    [Icon] <b-button @click="loginGoogle">Login with Google</b-button>
    [Icon] <b-button @click="loginFacebook">Login with Facebook</b-button>
    [Icon] <b-button @click="logout">Logout</b-button>
    {{ loginResponse }}
    <hr>
    <h1>Deug</h1>
    <h2>debug</h2>
    {{ debug }}
    <h2>currentUser</h2>
    {{ currentUser }}
    <h2>Store.currentUser</h2>
    {{ $store.state.auth.currentUser }}
    <h2>Store.profile</h2>
    {{ $store.state.auth.userProfile }}
    <h2>Store</h2>
    {{ $store.state.auth }}
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loginResponse: '',
      debug: '',
      store: null
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    loginGoogle() {
      this.socialLogin(new firebase.auth.GoogleAuthProvider());
    },
    loginFacebook() {
      this.socialLogin(new firebase.auth.FacebookAuthProvider());
    },
    logout() {
      firebase.auth().signOut().then(() => {
        // this.$store.dispatch('clearData')
        this.$router.push('/login');
        this.$store.commit('setCurrentUser', null);
      }).catch(err => {
        console.log(err);
      });
    },
    socialLogin(provider) {
      firebase.auth().signInWithPopup(provider).then(
        (result) => {
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;

          this.debug = {
            uid: result.user.uid,
            photoURL: result.user.photoURL,
            displayName: result.user.displayName,
            email: result.user.email,
            token: token
          };
          // // update store
          this.$store.commit('setCurrentUser', user);
          this.$store.dispatch('fetchUserProfile');
          // // go to home
          this.store = this.$store.state.auth;
          // this.$router.push('/home')

          // this.$router.replace('home');
        },
        err => {
          this.loginResponse = err;
        }
      ).catch(err => {
        alert('failure');
        console.log(err);
        // this.$router.replace('home');
        this.loginResponse = 'Err: ' + err;
      });
    }
  }

};
</script>

<style>
.content {
  text-align: center;
}
</style>
