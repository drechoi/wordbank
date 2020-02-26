<template>
  <Layout :title="title" :is-loading="isLoading">
    <b-container>
      [ ... some scheme menu ... ]
      this is book list
      {{ $store.getters.getCurrentScheme }}

      <b-row cols="1" cols-sm="3">
        <b-col>
          <b-card title="Add new book">
            <b-card-text> could go add book page or just a simple name box </b-card-text>
            <b-button size="lg" @click="addNewBook"><font-awesome-icon icon="plus" /> Add</b-button>

          </b-card>
        </b-col>
        <b-col v-for="(book, index) in $store.getters.getAllBooks" :key="index">

          <b-card no-body class="mt-1">
            <b-link :to="`/book/${book.id}`">
              <b-card-header>
                <b-card-title>
                  <font-awesome-icon icon="address-book" />
                  {{ book.data().name }}
                </b-card-title>
              </b-card-header>

              <b-card-body>
                <b-card-sub-title>{{ book.id }}</b-card-sub-title>
                <b-card-text>

                  total number of ***
                  [small btn] for edit and delete
                </b-card-text>
              </b-card-body>
            </b-link>

            <b-card-footer align="right">
              <b-button :to="`/book/${book.id}`" size="sm"><font-awesome-icon icon="eye" /></b-button>
              <b-button :to="`/book/${book.id}/settings`" size="sm"><font-awesome-icon icon="cog" /></b-button>
              <b-button size="sm" @click="showDeleteConfirmation(book.id)"><font-awesome-icon icon="trash" /></b-button>
            </b-card-footer>
          </b-card>

        </b-col>
      </b-row>

      [add a new book] + [book cards]
      {{ $store.getters.getAllBooks.length }}
    </b-container>
  </Layout>
</template>

<script>
import NavBar from '@/components/NavBar';
import Layout from '@/components/Layout';

// const UserReject = (msg) => {};

export default {
  components: {
    NavBar,
    Layout,
  },
  data() {
    return {
      title: 'Book List',
      isLoading: false,
    };
  },
  computed: {
  },
  mounted() {
    this.refreshBookList()
      .then(this.log('finished refresh without problem'))
      .catch(err => {
        this.error(err);
        this.$router.push('/scheme');
      }).finally(
        () => { this.isLoading = false; }
      );
  },
  methods: {
    refreshBookList() {
      return this.$store.dispatch('fetchAllBooks');
    },
    addNewBook() {
      this.loading = true;
      const payload = {
        schemeId: this.$store.getters.getCurrentScheme.id,
        bookName: 'Dummy'
      };

      this.$store.dispatch('addNewBook', payload)
      // .then(Promise.resolve(this.alert(this.message.DONE)))
        .then(() => this.alert(this.messages.DONE))
        .then(this.refreshBookList)
        .catch(this.error)
        .finally(this.loading = false);
    },
    deleteBook(bookId) {
      this.isLoading = true;

      // TODO: prompt confirmation message
      this.confirmDelete()
        .then(() => this.$store.dispatch('deleteBook', bookId))
        .then(this.refreshBookList)
        .then(() => this.alert(this.messages.DONE))
        .catch(this.error)
        .finally(() => { this.isLoading = false; });
    },
    confirmDelete() {
      // return () => Promise.reject('User cancelled');
      return new Promise((resolve, reject) => {
        reject(Error('User cancelled'));
      });
    },

    showDeleteConfirmation(bookId) {
      this.$bvModal.msgBoxOk('Action completed')
        .then(value => {
          this.alert('confirm ' + value);
        })
        .catch(err => {
          // An error occurred
          this.alert('confirm ' + err);
        });
    },
    promisTest() {
      Promise.resolve('User resolve')
        .then(res => this.alert('a' + res))
        .then(res => this.alert('b' + res))
        .then(res => Promise.reject(Error('this.confirmDelete')))
        .then(this.confirmDelete)
        .then(res => this.alert('a' + res))
        .catch(err => this.alert(err))
        .finally(() => this.alert('finally'));
    }
  }
};
</script>
