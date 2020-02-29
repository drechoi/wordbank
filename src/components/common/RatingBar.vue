<template>
  <div>
    <font-awesome-icon v-for="i in 5" :icon="[(i > value) ?  'far' : 'fas', 'star']" :key="i" />
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
  },
};
</script>
