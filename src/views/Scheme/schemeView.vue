<template>
  <div>
    <navBar :page-title="pageTitle" />
    <b-container>
      <div>
        Basic Info
        <ul>
          <li>Scheme name</li>
          <li>Owner name</li>
          <li>permission and requests</li>
          <li>user list</li>
        </ul>
      </div>
      <div>
        functionality
        <ul>
          <li>All books</li>
          <li>CRUD book</li>
          <li>Settings</li>
          <li>Change scheme or within settings?</li>
        </ul>
        Add book
      </div>
      - link - all route view or setting page?
      - scheme basic info or setting page
      - scheme name
      - list all books    -- this should be a subcollection
      - call fetch all books
      - list all user? or setting

      - add book
      - current book - or maybe not

      <div>
        Debug !
        Router params
        {{ this.$route.params.id }}

        <p>
          Scheme !
          {{ scheme }}
        </p>

        <!-- {{$route}}
        {{$router.params}} -->
      </div>
      [scheme view !]
      [list of possible schemes]
      <!-- <b-link :to="'/scheme/' + $store.getters.getCurrentScheme.id">Current Scheme</b-link> -->
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
      pageTitle: 'Profile',
      scheme: {}
    };
  },
  mounted() {
    console.log('mounted');
    const schemeId = this.$route.params.id;
    this.$store.dispatch('fetchScheme', schemeId)
      .then(
        res => {
          if (res) {
            this.scheme = res;
            // next do fetch book list right?

            this.$store.dispatch('fetchAllBooksBySchemeId', schemeId)
              .then()
              .catch(console.error);
          } else {
            this.$router.push('/notfound');
          }
        }
      ).catch(err => {
        console.error('err');
        console.error(err);
        this.$router.push('/error');
      });
  }
};
</script>
