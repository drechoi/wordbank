<template>
  <Layout icon="star" title="Achievements">
    <div class="overflow-auto">
      <b-container v-for="i in 5" :key="i" class="border rounded mt-1">Some content</b-container>
    </div>
  </Layout>
</template>
<script>
import Layout from './Layout';
export default {
  components: {
    Layout,
  },
};
</script>
