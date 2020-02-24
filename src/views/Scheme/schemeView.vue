<template>
  <div>
    <navBar :page-title="pageTitle" />
    <b-container v-if="!scheme">
      Profile not found
    </b-container>
    <b-container v-else>

      <div>
        Debug !
        Router params
        {{ this.$route.params.id }}

        <p>
          Scheme !
          {{ scheme }}
        </p>

        <!-- {{$route}}
        {{$router.params}} -->
      </div>
      [scheme view !]
      [list of possible schemes]
      <!-- <b-link :to="'/scheme/' + $store.getters.getCurrentScheme.id">Current Scheme</b-link> -->
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      pageTitle: 'test',
      scheme: {}
    };
  },
  mounted() {
    this.$store.dispatch('fetchScheme', this.$route.params.id)
      .then(
        scheme => this.scheme = scheme
      ).catch(err => {
        console.error(err);
      });
  }
};
</script>
