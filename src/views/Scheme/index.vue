<template>
  <div>
    <navBar :page-title="pageTitle" />
    <b-container v-if="redirectCountdown">
      Will redirect in {{ redirectCountdown }}
    </b-container>
    <b-container v-else>
      {{ $store.getters.getUserProfile }}

    </b-container>

    <!-- <b-container>
      <div>
        Debug !
        {{ $store.getters.getCurrentScheme }}
      </div>
      [scheme view index (Dummy)!]
      [list of possible schemes]
      <b-link :to="'scheme/' + $store.getters.getCurrentScheme.id">Current Scheme</b-link>
    </b-container> -->
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
      willRedirect: false,
      redirectCountdown: null
    };
  },
  mounted() {
    console.log('scheme index mounted');
    const currentScheme = this.$store.getters.getCurrentScheme;
    const userProfile = this.$store.getters.getUserProfile;

    console.log(currentScheme);
    // console.log(currentScheme.id);
    console.log(userProfile);

    if (currentScheme) {
      this.$router.push(`/scheme/${currentScheme.id}`);
    } else if (userProfile) {
      console.log('userProfile');
      if (userProfile.defaultScheme) {
        console.log('defaultScheme');
        this.$router.push(`/scheme/${userProfile.defaultScheme}`);
      }
    }
    console.log('end of scheme index mounted');
    // if (userProfile && userProfile.defaultScheme) {
    //   this.redirectCountdown = 5;
    //   let countdownInterval = setInterval(
    //     () => {
    //       console.log('tick: ' + this.redirectCountdown--);
    //       if (this.redirectCountdown < 0) {
    //         clearInterval(countdownInterval);
    //         this.$router.push(`/scheme/${userProfile.defaultScheme}`);
    //       }
    //     }, 1000
    //   );
    // }
  },
};
</script>
