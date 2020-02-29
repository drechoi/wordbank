<template>


  <div>
    <navBar page-title="123"/>
    <b-container>
      <b-container fluid="lg" align="center" class="mt-1 mb-1">
        <b-button-group>
          <b-button><font-awesome-icon icon="star" /> Achieve</b-button>
          <b-button disabled><font-awesome-icon icon="tasks" /> Add a task</b-button>
          <b-button><font-awesome-icon icon="gift" /> make a wish</b-button>
          <b-button :to="`/book/${$route.params.id}/settings`"><font-awesome-icon icon="cog" /> Settings</b-button>
        </b-button-group>
      </b-container>

      <b-row cols="1" cols-md="2">
        <b-col>
          <b-card no-body class="mt-1">
            <b-card-header>
              <h5><font-awesome-icon icon="info" /> [MVP] Basic info / Book name</h5>
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
              <b-link>
                <b-row>
                  <b-col cols="8">
                    <h5><font-awesome-icon icon="star" /> Achievements [MVP]</h5>
                  </b-col>
                  <b-col cols="4" align="right">
                    <b-button v-b-modal.modal-new-achievement><font-awesome-icon icon="plus" /> Add</b-button>
                  </b-col>
                </b-row>
              </b-link>
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
          <b-card no-body class="mt-1">
            <b-card-header>
              <b-link><h5><font-awesome-icon icon="tasks" /> [TODO] Tasks</h5></b-link>
            </b-card-header>
            <p class="mt-5 mb-5">
              [WIP]
              [task view]
              [name]
              [description]
              [task type - one off / daily]
              [reward]
              [asssigned by]
              [expiry]
              [status]
            </p>
          </b-card>
        </b-col>
        <b-col>
          <b-card no-body class="mt-1">
            <b-card-header>
              <b-link><h5><font-awesome-icon icon="tasks" /> Wishes (MVP)</h5></b-link>
            </b-card-header>
            <p class="mt-5 mb-5">
              [wish list]
              [name]
              [description]
              [timestamp]
              [suggested price]
              [assigned price]
              [status]
            </p>
          </b-card>
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

    <!--- modals --->
    <b-modal id="modal-new-achievement"
      ref="modal"
      title="New achievement"
      @show="ResetAchievementModal"
      @hidden="ResetAchievementModal"
      @ok="handleAchievementModalOk"
    >
      <form ref="achievementInputForm.nameState" @submit.stop.prevent="handleAddAchievement">
        <b-form-group
          :state="nameState"
          label="Title"
          label-for="name-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="name-input"
            v-model="achievementInputForm.name"
            :state="achievementInputForm.nameState"
            required
          />
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Description"
          label-for="achievement-input-description"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="achievement-input-description"
            v-model="achievementInputForm.name"
            :state="achievementInputForm.nameState"
            required
          />
        </b-form-group>
        <b-form-group
          label="Date"
          label-for="achievement-input-datepicker"
        >
          <b-form-datepicker id="achievement-input-datepicker" v-model="achievementInputForm.date" class="mb-2"></b-form-datepicker>
        </b-form-group>
        <b-form-group
          label="Rating"
          label-for="achievement-input-rating"
        >
          <RatingBar id="achievement-input-rating" v-model="achievementInputForm.rating"/>
        </b-form-group>

      </form>
    </b-modal>


  </div>
</template>

<script>
import navBar from '@/components/NavBar';
import RatingBar from '@/components/common/RatingBarInput';

export default {
  components: {
    navBar,
    RatingBar,
    bookId: null
  },
  data() {
    return {
      achievementInputForm: {
        // rating: 1,
      },
    };
  },
  mounted() {
    // load the book
    // fetch book?

    const bookId = this.$route.params.id;
    console.log(bookId);
  },
  methods: {
    achievementFormValidity() {
      const valid = this.$refs.achievementForm.checkValidity();
      this.achievementInputForm.nameState = valid;
      // this.achievementInputForm.formState = valid;
      return valid;
    },
    handleAchievementModalOk(event) {
      event.preventDefault();

      this.handleAddAchievement();

      // this.$bvModal.msgBoxConfirm(`should be a form`)
      //   .then(value=>{
      //     if(value){
      //       // resolve
      //     } else {
      //       // reject
      //     }
      //   })
      //   .catch(this.error);
    },
    handleAddAchievement() {
      if(!this.achievementFormValidity()) {
        return;
      };

      setTimeout(
        () => {
          this.$bvModal.hide('modal-new-achievement');
        }, 1000
      );
      // this.$nextTick(() => {

      // });
    },
    ResetAchievementModal() {
      this.achievementInputForm = {};
    }
  }

};
</script>

<style scoped>
.book-info {
  /* color: #333333; */
  /* background-color: #eeeeee; */
}
</style>
