<template>
  <div align="center">
    <font-awesome-icon v-for="i in 5"
                       :icon="[(i > value) ? 'far' : 'fas', 'star']"
                       :key="i"
                       :size="size"
                       @mouseover="$emit('onItemHover', i)"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      default: ''
    }
  },
};
</script>
