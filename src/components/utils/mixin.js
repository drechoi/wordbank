import message from './message';

const Mixin = {
  data() {
    return {
      defaultAlertDuration: 3000,
      messages: message
    };
  },
  methods: {
    alert: function(message, variant = null) {
      if (this.$bvToast) {
        this.$bvToast.toast(message, {
          title: 'Message',
          toaster: 'b-toaster-top-center',
          variant: variant,
          defaultAlertDuration: 3000,
          appendToast: false
        });
      } else {
        alert(message);
      }
    },
    alertError: function(message) {
      this.alert(message, 'danger');
    },
    log: function(message) {
      // only for dev or test
      if (process.env.NODE_ENV !== 'production') {
        console.log(`${process.env.NODE_ENV} log: ${message}`);
      }
    },
    error: function(err, message = null) {
      if (process.env.NODE_ENV !== 'production') {
        this.alertError(err);
        console.error(`${process.env.NODE_ENV} error: ${err}`);
      }

      if (message) {
        this.alertError(message);
      }
    },
  }
};

export default {
  install(Vue, options) {
    Vue.mixin(Mixin);
  }
};
