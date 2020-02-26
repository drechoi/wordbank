'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  FIREBASE_CONFIG: "",
  NODE_ENV: '"testing"'
})
