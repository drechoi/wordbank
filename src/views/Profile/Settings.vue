<template>
  <Layout :is-loading="user===null">
    <h3>User Setting</h3>
    {{ user }}
    <Card title="Personal info" icon="info">
      <b-row>
        <b-col>
          <h3>{{ userName }}</h3>
          <b-form-group
            label="Default Profile"
            label-for="dd-default-profile">
            <b-dropdown id="dd-default-profile" text="Default Profile">
              <b-dropdown-item>1</b-dropdown-item>
              <b-dropdown-item>2</b-dropdown-item>
              <b-dropdown-item>3</b-dropdown-item>
            </b-dropdown>
          </b-form-group>
        </b-col>
        <b-col cols="4" align="right">
          <b-img :src="avatarUrl" alt="avatar" class="rounded avatarImg" />
        </b-col>
      </b-row>
      <div align="right">
        <b-button>Save</b-button>
      </div>
    </Card>
    <Card title="Profiles" icon="id-badge">
      <b-dropdown>
        <b-dropdown-item>1</b-dropdown-item>
      </b-dropdown>
    </Card>

    [Profile info.. basic info.. display only..]

    [list of profile (schemes) and status]
    [change current (schemes) with set default]
    [Add new profile (schemes) or join others]

  </Layout>
</template>

<script>
import Layout from '@/components/Layout';
import Card from '@/components/common/CardTemplate';

export default {
  components: {
    Layout,
    Card
  },
  data() {
    return {
    };
  },
  computed: {
    user() { return this.$store.getters.getUserProfile; },
    avatarUrl() { return this.user ? this.user.photoURL : ''; },
    userName() { return this.user ? this.user.displayName : ''; }
  },
};
</script>

<style lang="scss" scoped>
.avatarImg {
  width: 5em;
}
</style>
