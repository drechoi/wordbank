<template>
  <div>
    <b-container>
      This is Home View - Debug 2
      <ul>
        <li v-for="(route, index) in routes" :key="index">
          <b-link :to="route.path">{{ route.name }}</b-link>
        </li>
      </ul>
      <b-modal v-model="isLoading">Loading ... [TODO: replace with image]</b-modal>
      <p>
        <image-uploader
          :preview="true"
          :class-name="['fileinput', { 'fileinput--loaded': hasImage }]"
          :debug="1"
          :auto-rotate="true"
          :max-width="512"
          capture="environment"
          accept="image/*"
          output-format="verbose"
          @input="setImage"
          @onUpload="beforeUploadImage"
          @onComplete="afterUploadImage"
        >
          <label slot="upload-label" for="fileInput">
            <figure>
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="32"
                   height="32"
                   viewBox="0 0 32 32">
                <path
                  class="path1"
                  d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                />
              </svg>
            </figure>
            <span class="upload-caption">
              {{
                hasImage ? "Replace" : "Click to upload"
              }}
            </span>
          </label>
        </image-uploader>
      </p>
    </b-container>
  </div>
</template>

<script>
import Router from '@/router/AllRoutes';

export default {
  data() {
    return {
      routes: Router,
      hasImage: false,
      image: null,
      isLoading: false
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
