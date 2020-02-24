'use strict'

console.log('build production');
console.log('process env');
console.log(process.env);
console.log(process.env.FIREBASE_CONFIG);


module.exports = {
  NODE_ENV: '"Production"',
  FIREBASE_CONFIG: process.env.FIREBASE_CONFIG
}
