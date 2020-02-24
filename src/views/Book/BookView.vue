<template>
  <div>
    <navBar pageTitle="123"></navBar>
    <b-container>
      <p>[list of button with permission]</p>
      <b-button>Add sticker</b-button>
      <b-button>Add a task</b-button>
      <b-button>make a wish</b-button>
      <b-button>Settings [go to setting page] </b-button>

      <b-row cols="1" cols-sm="2">
        <b-col>
          <b-container class="book-info border border-primary rounded mt-1 mb-1">
            <p class="mt-5 mb-5">
            Book Info
            - name
            - total stickers or ***
            - owner?
            </p>
          </b-container>
        </b-col>
        <b-col>
          <b-container class="book-info border border-primary rounded mt-1 mb-1">
            [history view]
            [stickers and completed tasks]
            [sticker: {
              description
              assigned by
              number of star / rewards point
              timestamp
            }]
            [click to full list]
          </b-container>
        </b-col>
        <b-col>
          <b-container class="book-info border border-primary rounded mt-1 mb-1">
          [task view]
          [name]
          [description]
          [task type - one off / daily]
          [reward]
          [asssigned by]
          [expiry]
          [status]
          </b-container>
        </b-col>
        <b-col>
          <b-container class="book-info border border-primary rounded mt-1 mb-1">
          [wish list]
          [name]
          [description]
          [timestamp]
          [suggested price]
          [assigned price]

          </b-container>
        </b-col>
        <b-col>
          <b-container class="book-info border border-primary rounded mt-1 mb-1">
          [anything, maybe statistic]
          </b-container>
        </b-col>
      </b-row>

      - all stickers task list
      - wish list
      - links:
        - history
        - settings
    </b-container>
  </div>
</template>

<script>
import navBar from '@/components/navbar';

export default {
  components: {
    navBar
  }
};
</script>

<style scoped>
.book-info {
  /* color: #333333; */
  /* background-color: #eeeeee; */
}
</style>
