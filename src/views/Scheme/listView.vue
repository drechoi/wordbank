<template>
  <div>
    <navBar :page-title="pageTitle" />
    <b-container>
      <div>

        <p>
          -- Debug --
          user profile
          {{ this.$store.getters.getUserProfile }}
        </p>

      </div>
      [scheme list view !]
      [list of possible schemes]
      <b-link :to="currentSchemeURL">Current Scheme</b-link>
      <h2>Create and add new scheme to profile</h2>

      <b-input-group>
        <b-input v-model="newSchemeName" />
        <template v-slot:append>
          <b-button @click="addNewScheme">Add</b-button>
        </template>
      </b-input-group>

      <div>
        <h2>Schemes</h2>
        <div v-for="scheme in schemeList" :key="scheme">
          <b-link :to="'/scheme/' + scheme">agr</b-link>
          {{ scheme }}
        </div>

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
      pageTitle: 'test',
      newSchemeName: ''
    };
  },
  computed: {
    currentSchemeURL() { return this.$store.getters.getCurrentScheme ? 'scheme/' + this.$store.getters.getCurrentScheme.id : ''; },
    userProfile() {
      console.log('computed 1');
      console.log(this.$store.getters.getUserProfile);
      return '?';
    },
    schemeList() {
      const currentUser = this.$store.getters.getUserProfile;
      return currentUser ? currentUser.schemes : [];
    }
  },
  mounted() {
    const userProfile = this.$store.getters.getUserProfile;
    if (userProfile && userProfile.defaultScheme) {
      console.log(this.$router);
      console.log(this.$router.push);

      this.$router.push(`/scheme/${userProfile.defaultScheme}`);
      // this.$router.push({ path: 'scheme', query: { id: userProfile.defaultScheme } })
    }
  },
  methods: {
    addNewScheme() {
      if (this.newSchemeName) {
        this.$store.dispatch('createNewScheme',
          {
            owner: this.$store.getters.getCurrentUserId,
            schemeName: this.newSchemeName,
            isDefault: true
          }).then(
          result => {
            console.log('scheme created');
            console.log(result);
          }
        ).catch(
          err => {
            alert('error');
            console.log(err);
          }
        );
      }
    }
  }
};
</script>
