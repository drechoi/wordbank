<template>
  <div>
    <navBar page-title="Store Demo" />
    <b-container>
      <b-container>
        <h4>Raw</h4>
        <b-button @click="addCat">Add Cat</b-button>

        <b-button @click="deleteFirstCat">Delete first Cat</b-button>

        <p>{{ $store.state.localDbDemo.cats }}</p>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      cats: this.$store.state.localDbDemo.cats
    };
  },
  created() {
    this.cats = this.$store.dispatch('getCats');
  },
  methods: {
    async addCat() {
      console.log('add cat');
      let cat = {
        name: 'Cat' + Math.floor(Math.random() * 100),
        age: Math.floor(Math.random() * 10) + 1
      };
      await this.$store.dispatch('saveCat', cat);
      console.log('add cat - end');
    },
    async deleteFirstCat() {
      console.log('delete first cat');
      const cats = this.$store.state.localDbDemo.cats;
      console.log(cats);
      console.log(cats.length);
      if (cats.length > 0) {
        await this.$store.dispatch('deleteCat', cats[0]);
      }
    }
  }
};

</script>
