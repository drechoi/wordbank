'use strict'

console.log('build production');
console.log('process env');

console.log(process.env.PORT);
console.log(process.env.FIREBASE_CONFIG);


module.exports = {
  FIREBASE_CONFIG: {
  },
  VUE_APP_FIREBASE_API_KEY: '',
  VUE_APP_FIREBASE_AUTH_DOMAIN: '',
  VUE_APP_FIREBASE_DATASE_URL: '',
  VUE_APP_FIREBASE_PROJECT_ID: '',
  VUE_APP_FIREBASE_STORAGE_BUCKET: '',
  VUE_APP_FIREBASE_MESSAGE_SENDER_ID: '',
  VUE_APP_FIREBASE_APP_ID: '',
  NODE_ENV: '"_Production_"'
}
