
require('babel-core/register');
require('babel-polyfill');

const app = require('./server/app');

app.listen(8082)
console.log('app started at port 8082...')