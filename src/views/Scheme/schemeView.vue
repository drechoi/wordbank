<template>
  <div>
    <navBar :page-title="pageTitle" />
    <b-container>
      <div>
        Debug !
        {{ $store.getters.getCurrentScheme }}
      </div>
      [scheme view !]
      [list of possible schemes]
      <b-link :to="'/scheme/' + $store.getters.getCurrentScheme.id">Current Scheme</b-link>
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
      pageTitle: 'test'
    };
  }
};
</script>
