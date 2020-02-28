<template>
  <Layout :is-loading="isLoading" title="Settings">
    <b-link :to="`/book/${bookId}`">Back</b-link>
    <b-container class="border rounded mt-1">
      <h3>Basic info</h3>
      <label for="input-name">Name:</label>
      <b-input id="input-name" :placeholder="currentBook?currentBook.name:''" v-model="editName" />
      <b-container fluid align="right">
        <b-button id="btn-save" @click="basicInfoSave($event)"><font-awesome-icon icon="save" /> Save</b-button>
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
    this.log('[setting][mounted] start');

    this.isLoading = true;
    // const storedCurrentBook = this.$store.getters.getCurrentBook;
    const bookId = this.$route.params.id;
    this.log(`[setting][mounted] bookId: ${bookId} `);

    // this.$store.dispatch('fetchBookById', bookId)
    this.reloadCurrentBook(bookId)
      .then(res => {
        this.log(`[setting][mounted] loaded bookl, ${res}`);
        this.currentBook = res;
      }).catch(err => {
        this.log(`[setting][mounted] catch, ${err}`);
        this.error(err, this.messages.FAIL_LOADING);
        this.$router.push('/');
      }).finally(
        () => {
          this.isLoading = false;
          this.log('[setting][mounted] resolved');
        }
      );

    this.log('[setting][mounted] end');
  },
  methods: {
    basicInfoSave() {
      this.isLoading = true;
      this.log('[setting][save] - start');

      const payload = {
        name: this.editName
      };

      this.$store.dispatch('updateBook', payload)
        .then(res => {
          this.log(`[setting][update] ${res}`);
          return this.reloadCurrentBook(this.bookId);
        }).then((res) => {
          this.alert(this.messages.DONE);
          this.currentBook = res;
          // clear all the inputs.
          this.editName = '';
        }).finally(() => {
          this.isLoading = false;
          this.log('[setting][save] - resolved');
        });
    },
    reloadCurrentBook(bookId) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('fetchBookById', bookId)
          .then(res => {
            if (!res) {
              this.log('[setting][reload]: no book after fetching DB');
              reject(this.messages.MSG_NO_BOOK);
              return;
            }
            this.log(`[setting][reload] return book ${res}`);
            resolve({ id: res.id, ...res.data() });
          }).catch(reject);
      });
    }
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
