<template>
  <Layout title="index">
    <b-button v-b-modal.add-word-modal>Add new word</b-button>

    <b-container>test</b-container>

    <wordList :words="words"/>
    <b-modal
      id="add-word-modal"
      ref="my-modal"
      title="Test"
      @ok="handleModelOk">
      <b-form ref="new-item-form" @submit.stop.prevent="handleFormSubmit">
        <b-form-group
          id="input-group-test-01"
          :state="nameState"
          label="Your new word"
          label-for="input-test-01"
          invalid-feedback="Name is required" >
          <b-form-input
            id="input-test-01"
            v-model="name"
            :state="nameState"
            required
            placeholder="New word"/>
        </b-form-group>
        <b-form-group
          id="input-group-test-02"
          :state="imgState"
          required
          invalid-feedback="An image is required" >
          <image-uploader
            :preview="true"
            :class-name="['fileinput', { 'fileinput--loaded': hasImage }]"
            :debug="1"
            :auto-rotate="true"
            :max-width="256"
            capture="environment"
            accept="image/*"
            output-format="string"
            @input="setImage"
            @onUpload="beforeUploadImage"
            @onComplete="afterUploadImage"
          >
            <div slot="upload-label">
              <b-button>
                <label for="fileInput">
                  <font-awesome-icon icon="camera" />
                  <span class="upload-caption">
                    {{
                      hasImage ? "Replace" : "Click to upload"
                    }}
                  </span>
                </label>
              </b-button>
            </div>
          </image-uploader>
        </b-form-group>
      </b-form>
      <!--
      <new-word-form />
    -->
    </b-modal>
  </Layout>
</template>

<script>
// import Vue from 'vue';
import Layout from '../Layout';
import newWordForm from './newWordForm';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import wordList from './wordlist';

export default {
  components: {
    Layout,
    newWordForm,
    wordList,
  },
  mixins: [validationMixin],
  data() {
    return {
      words: [
        {id: 0, word: 'a', pic: ''},
        {id: 1, word: 'b', pic: ''},
        {id: 2, word: 'c', pic: ''},
      ],
      nameState: null,
      imgState: null,
      name,
      hasImage: false,
      image: null,
      isLoading: false,
    };
  },
  validations: {
    form: {
      name: {
        required,
      }
    }
  },
  methods: {
    setImage: function(output) {
      this.hasImage = true;
      this.image = output;
    },
    beforeUploadImage: e => {
      this.isLoading = true;
    },
    afterUploadImage: e => {
      this.isLoading = false;
    },
    addWord(newWord, img) {
      // this.words = {...this.words, newWord};
      this.words.push(
        Object.freeze({id: 100, word: newWord, pic: img})
      );
    },
    handleModelOk(e) {
      e.preventDefault();

      this.handleFormSubmit();
    },
    checkFormValidity() {
      this.nameState = this.$refs['new-item-form'].checkValidity();

      this.imgState = this.hasImage;

      const valid = this.nameState && this.imgState;

      return valid;
    },
    handleFormSubmit() {
      // 1. do validation
      // 2. update store or data
      // 3. notify?
      // 4. close modal

      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      this.addWord(this.name, this.image);

      this.$nextTick(() => {
        this.$refs['my-modal'].hide();
      });
    }
  }
};
</script>

<style>
#fileInput {
  display: none;
}

.img-preview {
  display: block;
  width: 128px;
}
</style>
