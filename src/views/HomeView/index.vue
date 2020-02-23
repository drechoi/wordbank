<template>
  <div>
    <navBar :page-title="pageTitle" />
    <b-container>
      <div v-if="$store.state.scheme.currentScheme">
        <h2>[current profile name][setting button]</h2>
        book list
        .. add new book (need to do it in settings? i think not)
        {{ $store.state.scheme.bookList }}
        <b-container>
          <h3>Current Book</h3>
          {{ $store.state.book.currentBook }}
        </b-container>
      </div>
      <div v-else>
        <p>No profile available - please create one or join one</p>
        <b-card-group>
          <b-card title="create A new profile">
            <b-form-input v-model="newSchemeName" placeholder="Enter new profile"/>
            <b-button @click="createScheme">Create new profile</b-button>
          </b-card>
          <b-card title="join other profile">
            <b-form-input placeholder="Enter Profile Code"/>
            <b-button>Join profile</b-button>
          </b-card>
        </b-card-group>
      </div>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      pageTitle: 'Home',
      newSchemeName: ''
    };
  },
  computed: {
  },
  methods: {
    createScheme() {
      if (this.newSchemeName !== '') {
        const payload = {
          owner: this.$store.state.auth.currentUser.uid,
          schemeName: this.newSchemeName,
          isDefault: true
        };
        this.$store.dispatch('createNewScheme', payload);
      } else {
        alert('please provide a name');
      }
    },
  }
};
</script>
