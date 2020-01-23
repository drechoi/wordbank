<template>
  <Layout title="index">
    <b-button v-b-modal.add-word-modal>Add new word</b-button>
    <p v-for="(word, index) in words" :key="index">
      {{ word }}
    </p>

    <tmp title="t1">test4</tmp>
    <b-modal
      id="add-word-modal"
      ref="my-modal"
      title="Test"
      @show="test"
      @hidden="test"
      @ok="handleModelOk">
      <b-button block @click="hideModal">Close Me</b-button>
      <b-form @submit.stop.prevent="handleFormSubmit">
        <b-form-group
          id="input-group-test-01"
          label="Input your Word"
          label-for="input-test-01">
          <b-form-input
            id="input-test-01"
            required
            placeholder="Enter something"/>
        </b-form-group>
      </b-form>
      <tmp>test 5</tmp>
      <new-word-form />
    </b-modal>
  </Layout>
</template>

<script>
import Vue from 'vue';
import Layout from '../Layout';
import newWordForm from './newWordForm';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

Vue.component('tmp', {
  template: `
    <div class="blog-post">
  <b-form>
    <b-form-group
      id="input-group-test-01"
      label="Input your Word"
      label-for="input-test-01">
      <b-form-input
        id="input-test-01"
        required
        placeholder="Enter something"/>
    </b-form-group>
  </b-form>      
    </div>`,
});

export default {
  components: {
    Layout,
    newWordForm,
  },
  mixins: [validationMixin],
  data() {
    return {
      words: [
        {id: 0, word: 'a', pic: ''},
        {id: 1, word: 'b', pic: ''},
        {id: 2, word: 'c', pic: ''},
      ]
    };
  },
  validations: {
    form: {
      food: {
        required
      },
      name: {
        required,
        // minLength: minLength(3)
      }
    }
  },
  methods: {
    test() {
      console.log('test');
    },
    addWord(newWord) {
      this.words = {...this.words, newWord};
    },
    hideModal() {
      this.$refs['my-modal'].hide();
    },
    handleModelOk(e) {
      e.preventDefault();

      // this.handleFormSubmit();
      console.log(this.$refs);
      console.log(this.$refs['my-modal']);

      console.log(this.$refs['my-modal'].hide);
      this.$refs['my-modal'].hide();
      // this.$refs['my-modal'].hide();
      // Hide the modal manually
      this.$nextTick(() => {
        console.log('next tick');
        // this.$refs.my-modal.hide();
        // this.hideModal();
        this.$refs['my-modal'].hide();
      });
    },
    handleFormSubmit() {
      // 1. do validation
      // 2. update store or data
      // 3. notify?
      // 4. close modal
      alert('submit');
      alert('modal hide');
      this.$refs['my-modal'].hide();
      alert('modal hide');
    }
  }
};
</script>
