<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-link @click="goBack">Back</b-link>
      <b-navbar-brand to="#">{{ appName }}</b-navbar-brand>
      <b-navbar-toggle target="nav_collapse" />
      <b-collapse id="nav_collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" active-class="active" exact>Home</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <h3>Links</h3>
      <b-link to="#foo">Link</b-link>
      <h3>Buttons</h3>
      <b-button>test 1</b-button>
      <b-button>test 2</b-button>
      <h3>Cards</h3>
      <b-card no-body class="text-center">
        <div class="bg-secondary text-light">
          This is some content without the default <samp>&lt;b-card-body&gt;</samp> section. Notice the
          lack of padding between the card's border and this gray <samp>&lt;div&gt;</samp>.
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appName: this.$appName
    };
  },
  methods: {
    goBack: function() {
      console.log(this.$router);
      this.$router.go(-1);
    }
  }
};
</script>
