<template>
  <Layout :is-loading="isLoading" title="Settings no more">
    <b-link :to="`/book/${bookId}`">Back</b-link>
    <b-container class="border rounded mt-1">
      <h3>Basic info</h3>
      <label for="input-name">Name:</label>
      <b-input id="input-name" :placeholder="currentBook?currentBook.name:''" v-model="editName" />
      <b-container fluid align="right">
        <b-button @click="basicInfoSave"><font-awesome-icon icon="save" /> Save</b-button>
      </b-container>
    </b-container>
    <b-container class="border rounded mt-1">[TODO] Link to external account</b-container>
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
      isLoading: true,
      debug: '',
      bookId: null,
      currentBook: null,
      editName: null
    };
  },
  mounted() {
    // verify current book
    const storedCurrentBook = this.$store.getters.getCurrentBook;
    this.bookId = this.$route.params.id;

    if (!storedCurrentBook || storedCurrentBook.id !== this.bookId) {
      // fetch current book
      this.$store.dispatch('fetchBookById', this.bookId)
        .then(res => {
          this.currentBook = {id: res.id, bookId: this.bookId, ...res.data()};
          this.isLoading = false;
        })
        .catch(err => {
          this.currentBook = err;
          console.error(err);
          alert('TODO redirect');
        });
    } else {
      this.currentBook = {id: storedCurrentBook.id, ...storedCurrentBook.data()};
      this.isLoading = false;
    }
  },
  methods: {
    basicInfoSave() {
      const payload = {
        name: this.editName
      };

      this.$store.dispatch('updateBook', payload).then(res => {
        this.alert(this.messages.DONE);
        this.currentBook = {id: res.id, ...res.data()};
        // clear all the inputs.
        this.editName = '';
      }, this.error);

      // TODO:
      // dispatch(updateBook).then(refreshPage).finally(isLoading=false)
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
