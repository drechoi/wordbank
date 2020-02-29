<template>
  <div>
    <font-awesome-icon v-for="i in 5" :icon="[(i > value) ?  'far' : 'fas', 'star']" :key="i" @mouseover="onItemHover(i)"/>
  </div>
</template>
<script>
export default {
  props: {
    value: Number,
  },
  methods: {
    onItemHover(index) {
      this.value = index;
      this.$emit('input', this.value);
    }
  }
};
</script>
