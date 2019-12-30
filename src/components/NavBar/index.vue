<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="dark">
    <b-navbar-toggle target="nav_collapse" />
    <b-navbar-brand to="/">
      <b-img src="/static/favicon.png" height="30" alt="icon" />
      {{ pageTitle }}
    </b-navbar-brand>

    <b-collapse id="nav_collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/" active-class="active" exact>Home</b-nav-item>
        <b-nav-item to="/showData" active-class="active" exact>Feed [later]</b-nav-item>
        <b-nav-item to="/user" active-class="active">My little adventurer</b-nav-item>
        <b-nav-item to="/wishList" active-class="active" exact>Wish List</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
  }
};
</script>
