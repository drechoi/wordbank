<template>
  <div>
    <navBar page-title="123"/>
    <b-container>
      <b-container fluid="lg" align="center" class="mt-1 mb-1">
        <b-button-group>
          <b-button disabled><font-awesome-icon icon="star" /> Achieve</b-button>
          <b-button disabled><font-awesome-icon icon="tasks" /> Add a task</b-button>
          <b-button><font-awesome-icon icon="gift" /> make a wish</b-button>
          <b-button :to="`book/${bookId}/settings`"><font-awesome-icon icon="cog" /> Settings</b-button>
        </b-button-group>
      </b-container>

      <b-row cols="1" cols-sm="2">
        <b-col>
          <b-card no-body class="mt-1">
            <b-card-header>
              <h5><font-awesome-icon icon="info" /> [Book name]</h5>
            </b-card-header>
            <p class="mt-5 mb-5">
              Book Info
              - name
              - total stickers or ***
              - owner?
            </p>
          </b-card>
        </b-col>
        <b-col>
          <b-card no-body class="mt-1">
            <b-card-header>
              <b-link><h5><font-awesome-icon icon="star" /> Achievements</h5></b-link>

            </b-card-header>
            <p class="mt-5 mb-5">
              [history view]
              [stickers and completed tasks]
              [sticker: {
              description
              assigned by
              number of star / rewards point
              timestamp
              }]
              [click to full list]
            </p>
          </b-card>
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
import navBar from '@/components/NavBar';

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
