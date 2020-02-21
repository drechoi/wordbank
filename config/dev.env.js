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
  NODE_ENV: '"development_"'
})
