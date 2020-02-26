'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const firebaseConfig = require('./firebase.json')

module.exports = merge(prodEnv, {
  FIREBASE_CONFIG: firebaseConfig,
  NODE_ENV: '"dev"'
})
