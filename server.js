// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var history = require('connect-history-api-fallback');

// const options = require('./router.options.js');

app = express();
app.use(history({ verbose: true }));
app.use(serveStatic(__dirname + "/dist"));

console.log('dirname: '+ __dirname);
console.log('process: ');
console.log(process);

console.log('process env: ');
console.log(process.env);

console.log('process env port: '+ process.env.PORT);

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);