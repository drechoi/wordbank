<template>
  <div>
    <b-container>
      .... some custom component
      .... some input
      <Tmp v-model="modelTest"></Tmp>
      {{ modelTest }}
      <b-input v-model="modelTest"></b-input>
    </b-container>
    <b-container>
      This is Home View - Debug 2
      <ul>
        <li v-for="(route, index) in routes" :key="index">
          <b-link :to="route.path">{{ route.name }}</b-link>
        </li>
      </ul>
      <b-modal v-model="isLoading">Loading ... [TODO: replace with image]</b-modal>
      <p>
        Dummy content
      </p>
    </b-container>
  </div>
</template>

<script>
import Router from '@/router/AllRoutes';
import Tmp from '@/components/demo/custom';

export default {
  components: {
    Tmp
  },
  data() {
    return {
      routes: Router,
      hasImage: false,
      image: null,
      isLoading: false,
      modelTest: 1,
    };
  },
  methods: {
    setImage: function(output) {
      this.hasImage = true;
      this.image = output;
      console.log('Info', output.info);
      console.log('Info', output.dataUrl.length);
      console.log('Exif', output.exif);
    },
    beforeUploadImage: e => {
      this.isLoading = true;
    },
    afterUploadImage: e => {
      this.isLoading = false;
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
