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
        <b-input v-model="newSchemeName"></b-input>
        <template v-slot:append>
          <b-button @click="addNewScheme">Add</b-button>
        </template>
      </b-input-group>
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
    }
  },
  methods: {
    addNewScheme() {
      if(this.newSchemeName) {
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
