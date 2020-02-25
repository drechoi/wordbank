<template>
  <div>
    <NavBar :page-title="title" />
    <b-container v-if="isLoading">
      Debug Message: {{ debugMsg }}
      <b-spinner />

    </b-container>
    <b-container v-else>
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
    },
    debugMsg: {
      type: String,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      currentBook: null,
    };
  },
};
</script>
