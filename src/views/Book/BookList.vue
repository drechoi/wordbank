<template>
  <Layout :title="title" :is-loading="isLoading">
    <b-container>
      [ ... some scheme menu ... ]
      this is book list
      {{ $store.getters.getCurrentScheme }}

      <b-row cols="1" cols-sm="3">
        <b-col>
          <b-card title="Add new book">
            <b-card-text>
              <label for="input-name">Name:</label>
              <b-input id="input-name" v-model="newBookName" placeholder="Name" />
            </b-card-text>
            <b-button size="lg" @click="addNewBook"><font-awesome-icon icon="plus" /> Add</b-button>

          </b-card>
        </b-col>
        <b-col v-for="(book, index) in $store.getters.getAllBooks" :key="index">

          <b-card no-body class="mt-1">
            <b-link :to="`/book/${book.id}`">
              <b-card-header>
                <b-card-title>
                  <font-awesome-icon icon="address-book" />
                  {{ book.name }}
                </b-card-title>
              </b-card-header>

              <b-card-body>
                <b-card-sub-title>{{ book.id }}</b-card-sub-title>
                <b-card-text>
                  Show basic information
                  or summary
                </b-card-text>
              </b-card-body>
            </b-link>

            <b-card-footer align="right">
              <b-button :to="`/book/${book.id}`" size="sm"><font-awesome-icon icon="eye" /></b-button>
              <b-button :to="`/book/${book.id}/settings`" size="sm"><font-awesome-icon icon="cog" /></b-button>
              <b-button size="sm" @click="deleteBook(book)"><font-awesome-icon icon="trash" /></b-button>
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
      newBookName: '',
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
        bookName: this.newBookName,
      };

      this.$store.dispatch('addNewBook', payload)
        .then(this.refreshBookList)
        .then(() => {
          // clear input
          this.newBookName = '';
          this.alert(this.messages.DONE);
        })
        .catch(this.error)
        .finally(this.loading = false);
    },
    deleteBook(book) {
      const bookId = book.id;
      this.showDeleteConfirmation(book)
        .then(() => {
          this.isLoading = true;
          return this.$store.dispatch('deleteBook', bookId);
        })
        .then(this.refreshBookList)
        .then(() => this.alert(this.messages.DONE))
        .catch(this.alert)
        .finally(() => { this.isLoading = false; });
    },

    showDeleteConfirmation(book) {
      return new Promise((resolve, reject) => {
        this.$bvModal.msgBoxConfirm(`Are you sure to delete ${book.name}?`)
          .then(value => {
            // this.alert(`confirm ${value}`);
            if (value) {
              resolve();
            } else {
              reject(Error('User Cancelled'));
            }
          })
          .catch(err => {
            // An error occurred
            this.alert('reject ' + err);
            reject(err);
          });
      });
    }
  }
};
</script>
