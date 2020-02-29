<template>
  <div>
    <navBar :page-title="pageTitle" />
    <a href="whatsapp://send?text=try me" data-action="share/whatsapp/share">Share</a>
    <b-button @click="testMixin">Mixin Test</b-button>
    <b-container>
      <h3>----- Debug Scheme -----</h3>
      {{ $store.state.scheme }}
      <h3>----- Debug Profile -----</h3>
      {{ $store.state.auth }}
      {{ $store.getters }}
      {{ $store.getters.getUserId }}
      {{ $store.state.auth.userProfile }}
      <h3>----- End of Debug -----</h3>
    </b-container>
    <b-container>
      <h1>Profile</h1>
      <ul>
        <li>Profile menu</li>
        <li>Current Profile</li>
        <li>rename</li>
        <li>Profile selection</li>
        <li>add new</li>
        <li>remove</li>
      </ul>
      <b-button @click="addDummyBook">Add Dummy Book</b-button>
      <b-container>
        <div v-if="$store.state.scheme.currentScheme">
          <h2>[current profile name][setting button]</h2>
          {{ $store.state.scheme }}
        </div>
        <div v-else>
          <b-card-group>
            <b-card title="create A new profile">
              <b-form-input v-model="newSchemeName" placeholder="Enter new profile"/>
              <b-button @click="addNewScheme">Create new profile</b-button>
            </b-card>
            <b-card title="join other profile">
              <b-form-input placeholder="Enter Profile Code"/>
              <b-button>Join profile</b-button>
            </b-card>
          </b-card-group>
        </div>
      </b-container>
      <hr >
      <b-container>
        [active profile]
        {{ $store.state.scheme.currentScheme }}
        <ul>
          <li>Add book if empty</li>
          <li>Add Book</li>
          <li>Switch book</li>
        </ul>
      </b-container>
      <hr >
      <b-container>
        [active book]
        - book info
        - sticker page => add new sticker
        - statistic page
        - history page
        - wish list page
      </b-container>
      <hr >
      <b-container>
        <em>Items in settings</em>
        --- user profile settings page
        - button add new profile
        - set profile as default
        <b-dropdown text="Switch Profile">
          <b-dd-item v-for="(item, index) in listSchemesName" :key="index">{{ item }}</b-dd-item>
        </b-dropdown>

        <b-card title="create A new profile">
          <b-form-input v-model="newSchemeName" placeholder="Enter new profile"/>
          <b-button @click="addNewScheme">Create new profile</b-button>
        </b-card>

        - scheme setting page?
      </b-container>
      <userCard :user="$store.getters.getUserProfile"/>
    </b-container>
    <hr >
    <div>
      <h1>Debug area</h1>
      <p>data: {{ dataDebug }}</p>
      <p>is logged in: {{ isLoggedIn }}</p>

      <b-button @click="resetDB">Reset DB</b-button>

      <b-form-input v-model="fetchSchemeId" placeholder="Enter Scheme ID"/>
      <b-button @click="fetchScheme">Manual fetch scheme</b-button>
      <p>store: {{ $store.state.auth.currentUser }}</p>
      <p>
        <userCard :user="$store.getters.getUserProfile"/>
      </p>

    </div>
    <hr >
    <b-container>
      <b-container>
        <h4>Some value</h4>
        <p>
          {{ $store.state.dummy.someValue }}
          <b-button @click="test01">increment</b-button>
        </p>
      </b-container>
      <hr >
      <b-container>
        <h4>Some value 2</h4>
        <p>
          {{ $store.state.dummyInline.someValue }}
          <b-button @click="test03">increment</b-button>
        </p>
      </b-container>
      <hr >
      <b-container>
        <h4>Some List</h4>
        <ul>
          <li v-for="(listItem, index) in listItems" :key="index">
            {{ listItem }}
          </li>
        </ul>
        <b-button @click="test02">Add item</b-button>
      </b-container>
      <b-container>
        <h4>Raw</h4>
        <p>
          {{ $store.state.dummy }}
        </p>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar/navBarDebug';
import userCard from '@/components/userCard';
// import firebase from 'firebase/app';

export default {
  components: {
    NavBar,
    userCard,
  },
  data() {
    return {
      pageTitle: '[page title]',
      listItems: 'this.$store.state.dummy.someList',
      dataDebug: '123213',
      newSchemeName: '',

      fetchSchemeId: '',
      tmpArray: ['12', '123123'],
    };
  },
  computed: {
    isLoggedIn() { return 'this.$store.getters.getUserProfile !== null'; },
    currentUser() { return 'this.$store.getters.getUserProfile'; },
    listSchemesName() { return []; }
  },
  methods: {
    test01() {
      console.log('Commit increment');
      this.$store.commit('incrementValue');
      console.log('after Commit increment');
    },
    test02() {
      this.$store.commit('addItem');
    },
    test03() {
      this.$store.dispatch('inlineIncrement');
    },
    resetDB() {
      this.$store.dispatch('recreateUserProfile');
    },
    // this function is called when there is no avaiable scheme
    // that means newly created one should be the default one
    addNewScheme() {
      this.$store.dispatch('createNewScheme',
        {
          owner: this.$store.getters.getUserProfile,
          schemeName: this.newSchemeName,
          isDefault: true
        });
    },
    fetchScheme() {
      this.$store.dispatch('fetchScheme', this.fetchSchemeId);
    },
    addDummyBook() {
      this.$store.dispatch('addDummyBook');
    },
    testMixin() {
      this.log('this.greetings');
      this.alert('hi');
    }
  }
};

</script>
