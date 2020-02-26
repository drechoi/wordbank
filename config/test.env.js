'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  // FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
  NODE_ENV: '"testing"'
})
