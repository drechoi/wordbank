<template>
  <RatingBar :value="value" :size="size" @onItemHover="onItemHover" />
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
      required: true
    },
    size: {
      type: String,
      default: '3x'
    },
  },
  methods: {
    onItemHover(index) {
      this.$emit('input', index);
    }
  }
};
</script>
