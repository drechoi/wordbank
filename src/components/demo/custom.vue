<template>
  <div>
    ??
    {{dummy}},{{d2}}
    <font-awesome-icon v-for="i in dummy" icon="star" :key="`s${i}`"/><font-awesome-icon v-for="j in d2" :icon="['far', 'star']" :key="`t${j}`"/>
    <b-input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
export default {
  props: ['value'],
  data(){
    return {};
  },
  computed: {
    dummy(){ return Number.parseInt(this.value) ? Math.min(Math.max(0, Number.parseInt(this.value)),5) : -1; },
    d2(){ return 5-this.dummy;},
  },
};
</script>
