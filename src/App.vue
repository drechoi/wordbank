<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import topNav from '@/components/TopMenu';

export default {
  name: 'App',
  components: {
    topNav,
  },
  data() {
    return {
      appName: this.$appName,
    };
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
