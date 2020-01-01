<template>
  <div>
    <b-navbar toggleable="true" type="dark" variant="secondary">
      <b-navbar-brand to="/">
        <b-img src="static/favicon.png" height="30" alt="icon" />
        {{ title }}
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item>Setting</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-container class="m-3">
      <b-row>
        <b-col><b-link>Words of the day</b-link></b-col>
        <b-col><b-link>List all words</b-link></b-col>
        <b-col><b-input placeholder="Word" /><b-button>Search</b-button></b-col>
        <b-col><b-button>Add new word</b-button></b-col>
      </b-row>
      <slot />
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      Profile: {
        name: 'Dummy Profile',
        links: ['1', '2']
      }
    };
  }
};
</script>
