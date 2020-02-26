'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

console.log(process.env.test_secret);

module.exports = merge(prodEnv, {
  FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
  NODE_ENV: '"testing"'
})
