<template>
  <div>
    <topNav :app-name="appName" />
    <b-container>
      <p>
        --- this is Debug ---
        is log in: {{ $store.state.localAuth }}
        <b-button variant="primary" @click="login">Login</b-button>
        <b-button variant="outline-primary" @click="logout">Logout</b-button>
        <b-button variant="custom-color" @click="logout">cust 01</b-button>
        <b-button variant="outline-custom-color" @click="logout">cust 02</b-button>
        <a href="/">#</a>

        <b-button @click="updateLocalStorage">local</b-button>
        <b-button @click="renewToken">renewToken</b-button>

        {{ updateLocalStorage() }}
      </p>
      <p>
        --- this is Current user info ---
      </p>
      <UserInfo :state="{ tmp:'123' }" name="Bartholomew" />
      <p />

      <UserInfo name="Caitlyn"/>

      <p>
        --- this is wish list ---
      </p>
      <WishList :todos="$store.state.wish.wishItems" />
    </b-container>
  </div>
</template>

<script>
import WishList from '@/components/wishList';
import WishItem from '@/components/wishItem';
import UserInfo from '@/components/UserInfo';

const localStorageKey = 'tmp_local_storage_key';
export default {
  components: {
    WishList,
    WishItem,
    UserInfo,
  },
  computed: {
  },
  methods: {
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      alert('handle ok!' + this.name);
    },
    handleSubmit() {
      alert('handle submit!');
    },
    login() {
      this.$store.commit('login');
    },
    logout() {
      this.$store.commit('logout');
    },
    updateLocalStorage() {
      if (localStorage.getItem(localStorageKey) == null) {
        localStorage.setItem(localStorageKey, 1);
        return 1;
      } else {
        let tmp = localStorage.getItem(localStorageKey);
        tmp = tmp + 1;
        localStorage.setItem(localStorageKey, tmp);
        return tmp;
      }
    },
    renewToken() {
      try {
        this.$auth.renewTokens();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
