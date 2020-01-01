<template>
  <Layout title="index">
    <p>
      Suggested content
      <ul>
        <li>word of the day [tool bar + link / button to another page]</li>
        <li>Search entry [tool bar]</li>
        <li>New Entry [tool bar + Modals]</li>
        <li>List all Entry [tool bar + link / button to another page]</li>
        <li>change profile [banned settings]</li>
      </ul>
    </p>
  </Layout>
</template>

<script>
import Layout from './Layout';

export default {
  components: {
    Layout
  },
  data() {
    return {
      Profile: {
        name: 'Dummy Profile',
        links: ['1', '2']
      }
    };
  }
};
</script>
