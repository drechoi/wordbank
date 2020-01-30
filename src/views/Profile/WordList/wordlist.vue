<template>
  <b-container>
    <h2>Word List</h2>
    <b-table id="wordListTable" striped :items="words" :fields="fields">
      <template v-slot:cell()="data">
        <i>{{ data.value }}</i>
      </template>

      <template v-slot:cell(pic)="data">        
        <b-img :src="data.value"
               blank-color="#777" 
               rounded
               thumbnail />
      </template>
      <template v-slot:cell(edit)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="wordListTable" />
  </b-container>
</template>

<script>
export default {
  props: {
    words: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      fields: ['index', 'pic', 'word', 'Edit']
    };
  },
};

</script>
