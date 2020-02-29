<template>
  <b-card no-body class="mt-1">
    <b-card-header>
      <h5><font-awesome-icon :icon="[iconPrefix, icon]" /> {{ title }}</h5>
    </b-card-header>
    <b-container class="mt-2 mb-2">
      <slot />
    </b-container>
  </b-card>
</template>
<script>
export default {
  props: {
    iconPrefix: {
      type: String,
      default: 'fas'
    },
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
  },
};
</script>
