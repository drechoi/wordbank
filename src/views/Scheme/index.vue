<template>
  <Layout>
    <CardTemplate title="Profile Info">
      <LabelValue title="Test" value="Dummy" />

      <dl class="row">
        <dt class="col-sm-3">Name</dt>
        <dd class="col-sm-9">{{ currentScheme.schemeName }}</dd>

        <dt class="col-sm-3">Owner</dt>
        <dd class="col-sm-9">{{ currentScheme.owner }}</dd>
      </dl>

      <b-button :to="`/scheme/${userProfile.defaultScheme}`">
        <font-awesome-icon icon="eye" /> Enter
      </b-button>
      <b-button>
        <font-awesome-icon icon="cog" /> Settings
      </b-button>
    </CardTemplate>


    <p>
      Current Scheme Info:
      Name, owner
      Setting button  (Change name, approve / reject request ... )
      isDefault
      ownership / access right

      member list:{
        owner, admin, member, book_owner
      }
      requests...
    </p>

    <p>
      create or join new scheme
    </p>

    <p>
      go to another existsing scheme
    </p>

    {{ this.$store.getters.getCurrentScheme }}
    <b-container>
      {{ $store.getters.getUserProfile }}
      // profile list
      <b-dropdown>
        <b-dropdown-item>

        </b-dropdown-item>
      </b-dropdown>

    </b-container>
  </Layout>
</template>

<script>
import CardTemplate from '@/components/common/CardTemplate';
import Layout from '@/components/Layout';

export default {
  components: {
    Layout,
    CardTemplate,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    userProfile: function() { return this.$store.getters.getUserProfile; },
    currentScheme: function() { return this.$store.getters.getCurrentScheme; },
  },
  mounted() {
    this.isLoading = true;

    if (!this.currentScheme) {
      if (this.userProfile.defaultScheme) {
        // load default scheme
        this.$store.dispatch('fetchScheme', this.userProfile.defaultScheme)
          .then(() => {
            // not sure what to do here ?
          })
          .catch(() => {
            // redirect here..
          })
          .finally(() => { this.isLoading = true; });
      } else {
        // back to create scheme page or user setting page .. or show create scheme here
      }
    } else {
      this.isLoading = false;
    }

    // if (currentScheme) {
    //   this.$router.push(`/scheme/${currentScheme.id}`);
    // } else if (userProfile) {
    //   console.log('userProfile');
    //   if (userProfile.defaultScheme) {
    //     console.log('defaultScheme');
    //     this.$router.push(`/scheme/${userProfile.defaultScheme}`);
    //   }
    // }
  },
};
</script>
