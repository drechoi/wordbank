<template>
  <RatingBar :value="value" @onItemHover="onItemHover" />
</template>

<script>
import RatingBar from './RatingBar';

export default {
  components: {
    RatingBar
  },
  props: {
    value: {
      type: Number,
      default: 1
    },
  },
  methods: {
    onItemHover(index) {
      this.$emit('input', index);
    }
  }
};
</script>
