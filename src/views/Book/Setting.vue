<template>
  <Layout title="Settings">
    <b-link :to="`/book/${bookId}`">Back</b-link>
    <b-container class="border rounded mt-1">
      <h3>Basic info</h3>
      setting page
      Current Book:
      {{ currentBook }}
      <ul>
        <li>Name</li>
      </ul>

      <label for="input-name">Name:</label>
      <b-input id="input-name" :placeholder="currentBook.name" v-model="editName" />
      <b-container fluid align="right">
        <b-button @click="basicInfoSave"><font-awesome-icon icon="save" /> Save</b-button>
      </b-container>
      Current book: {{ currentBook }}
    </b-container>

  </Layout>
</template>

<script>
import Layout from '@/components/Layout';

export default {
  components: {
    Layout
  },
  data() {
    return {
      bookId: null,
      currentBook: null,
      editName: null
    };
  },
  mounted() {
    // verify current book
    const currentBook = this.$store.getters.getCurrentBook;
    this.bookId = this.$route.params.id;

    if (!currentBook || currentBook.id !== this.bookId) {
      // fetch current book
      this.$store.dispatch('fetchBookById', this.bookId)
        .then(res => {
          this.currentBook = res;
          console.log('book fetched!');
        })
        .catch( err => {
          this.currentBook = err;
          console.error(err);
        });
    }
  },
  methods: {
    basicInfoSave() {
      console.log('basic save')
      const payload = {
        name: this.editName
      };
      this.$store.dispatch('updateBook', payload).then(console.log).catch(console.log);
    },
  }
};
</script>
<style scoped>
input,
select,
optgroup,
button,
textarea {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}

</style>
