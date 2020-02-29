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
      required: true
    },
  },
  methods: {
    onItemHover(index) {
      this.$emit('input', index);
    }
  }
};
</script>
