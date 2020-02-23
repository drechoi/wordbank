<template>
  <div>
    <navBar :page-title="pageTitle" />
    <b-container>
      [scheme view]
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
