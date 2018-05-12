var token = require('jsonwebtoken');

console.log(token.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: 'foobar'
}, 'secret'));
