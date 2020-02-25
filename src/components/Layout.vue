<template>
  <div>
    <NavBar :pageTitle="title" />
    <b-container>
      <slot />
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  components: {
    NavBar
  },
  props: {
    title: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      currentBook: null,
    };
  },
  // computed: {
  //   breadcrumbList: function() {
  //     return this.$route.meta.breadcrumb;
  //   },
  // }
};
</script>
