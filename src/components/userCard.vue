<template>
  <div>
    <b-img v-bind="mainProps"
           :src="user.photoURL"
           rounded
           alt="avatar"/>
    {{ user.displayName }}
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
      required: true,
    }
  },
  data() {
    return {
      mainProps: { blankColor: '#777', width: 75, height: 75, class: 'm1' }
    };
  }
};
</script>
