<template>
  <b-container>
    <h2>Word List</h2>
    <b-table id="wordListTable"
             :items="words"
             :fields="fields"
             striped>
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
        <b-button size="sm" class="mr-2" @click="row.toggleDetails">
          Edit
        </b-button>
      </template>
      <template v-slot:cell(delete)="row">
        <b-button size="sm" class="mr-2" @click="row.toggleDetails">
          Delete
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
      fields: ['index', 'pic', 'word', 'Edit', 'Delete']
    };
  },
};

</script>
