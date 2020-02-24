'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const firebaseConfig = require('../config/firebase.json')

module.exports = merge(prodEnv, {
  FIREBASE_CONFIG: {
    apiKey: '"AIzaSyAG4RRsiDUnHVBVIV4nqg3ONi7uZ9kKIv8"',
    authDomain: '"mystickerbook-1f743.firebaseapp.com"',
    databaseURL: '"https://mystickerbook-1f743.firebaseio.com"',
    projectId: '"mystickerbook-1f743"',
    storageBucket: '"mystickerbook-1f743.appspot.com"',
    messagingSenderId: '"373897297328"',
    appId: '"1:373897297328:web:b443b5158fd3973eccea75"'
  },
  VUE_APP_FIREBASE_API_KEY: '"AIzaSyAG4RRsiDUnHVBVIV4nqg3ONi7uZ9kKIv8"',
  VUE_APP_FIREBASE_AUTH_DOMAIN: '"mystickerbook-1f743.firebaseapp.com"',
  VUE_APP_FIREBASE_DATASE_URL: '"https://mystickerbook-1f743.firebaseio.com"',
  VUE_APP_FIREBASE_PROJECT_ID: '"mystickerbook-1f743"',
  VUE_APP_FIREBASE_STORAGE_BUCKET: '"mystickerbook-1f743.appspot.com"',
  VUE_APP_FIREBASE_MESSAGE_SENDER_ID: '"373897297328"',
  VUE_APP_FIREBASE_APP_ID: '"1:373897297328:web:b443b5158fd3973eccea75"',
  NODE_ENV: '"development_"'
})
