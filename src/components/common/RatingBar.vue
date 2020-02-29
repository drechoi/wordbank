<template>
  <div>
    <font-awesome-icon v-for="i in 5" :icon="[(i > value) ?  'far' : 'fas', 'star']" :key="i"  @mouseover="$emit('onItemHover', i)"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
  },
};
</script>
