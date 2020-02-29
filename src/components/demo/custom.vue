<template>
  <div>
    <font-awesome-icon v-for="i in 5"
                       :icon="[(i > value) ? 'far' : 'fas', 'star']"
                       :key="`s${i}`"
                       @mouseover="onHover(i)"/>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
  },
  computed: {
    dummy() { return Number.parseInt(this.value) ? Math.min(Math.max(0, Number.parseInt(this.value)), 5) : -1; },
    d2() { return 5 - this.dummy; },
  },
  methods: {
    onHover(index) {
      this.value = index;
      this.$emit('input', this.value);
    }
  }
};
</script>
