<template>
  <div>
    <navBar :page-title="pageTitle" />
    <b-container v-if="isLoading">
      <b-spinner label="Loading"/>
    </b-container>
    <b-container v-else>
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
                <b-card-sub-title>123</b-card-sub-title>
                <b-card-text>
                  total number of ***
                  [small btn] for edit and delete
                </b-card-text>
              </b-card-body>
            </b-link>

            <b-card-footer align="right">
              <b-button :to="`/book/${book.id}`" size="sm"><font-awesome-icon icon="eye" /></b-button>
              <b-button :to="`/book/${book.id}/settings`" size="sm"><font-awesome-icon icon="cog" /></b-button>
              <b-button size="sm"><font-awesome-icon icon="trash" /></b-button>
            </b-card-footer>
          </b-card>

        </b-col>
      </b-row>

      [add a new book] + [book cards]
      {{ test }}
      {{ $store.getters.getAllBooks.length }}
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  components: {
    NavBar,
    isLoading: true
  },
  data() {
    return {
      pageTitle: 'Book List'
    };
  },
  computed: {
    test() {
      console.log('test');
      console.log(this.$store.getters.getAllBooks);

      for (let b in this.$store.getters.getAllBooks) {
        console.log(b);
        console.log('b');
      }
      return this.$store.getters.getAllBooks.map(a => a.id);
    }
  },
  mounted() {
    this.$store.dispatch('fetchAllBooks')
      .then(res => {
        console.log(res);
        // finish loading
        this.isLoading = false;
      })
      .catch(err => {
        console.error('redirect here: ');
        console.error(err);
        this.$router.push('/scheme');
      });

    // // fetch book list by current scheme
    // const currentScheme = this.$store.getters.getCurrentScheme;
    // if (currentScheme) {
    //   // fetch all books
    //   console.log('fetch books');
    //   // this.$store.dispatch('fetchAllBooksBySchemeId', currentScheme.id).then(console.log).catch(console.error);

    // } else {

    //   //
    // }
  },
  methods: {
    addNewBook() {
      const payload = {
        schemeId: this.$store.getters.getCurrentScheme.id,
        bookName: 'Dummy'
      };
      this.$store.dispatch('addNewBook', payload).then(console.log).catch(console.err);
      // alert('add New book');
    },
    visitBook(index) {
      alert('visit' + index);
    }
  }
};
</script>
