<template>
  <Layout :is-loading="isLoading" title="Settings">
    <b-link :to="`/book/${bookId}`">Back</b-link>
    <b-container class="border rounded mt-1">
      <h3>Basic info</h3>
      <label for="input-name">Name:</label>
      <b-input id="input-name" :placeholder="currentBook?currentBook.name:''" v-model="editName" />
      <b-container fluid align="right">
        <b-button id="btn-save" @click.native="basicInfoSave($event)"><font-awesome-icon icon="save" /> Save</b-button>
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

    this.$store.dispatch('fetchBookById', bookId)
      .then(res => {
        if (!res) {
          this.log('[setting][mounted]: no book after fetching DB');
          return Promise.reject(this.messages.MSG_NO_BOOK);
        }
        this.log('[setting][mounted] then');
        this.currentBook = { id: res.id, ...res.data() };
      })
      .catch(err => {
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
      this.log('---- basicInfoSave');

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
    refreshPage() {
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
