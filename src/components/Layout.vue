<template>
  <div>
    <NavBar :page-title="title || this.$appName" />
    <b-container v-if="isLoading" align="center">
      <b-spinner />
      <p>
        {{ loadingMessage || messages.DEFAULT_LOADING_MESSAGE }}
      </p>
      <p v-if="debugMsg"> Debug Message: {{ debugMsg }} </p>
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
    },
    loadingMessage: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      currentBook: null,
    };
  },
};
</script>
