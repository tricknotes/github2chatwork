var https = require('https');
var querystring = require('querystring');

var koa = require('koa');
var route  = require('koa-route');

var app = koa();

app.use(route.post('/chatwork/:room_id', function *(room_id) {
  var body = ''

  this.req.on('data', function(chunk) {
    body += chunk;
  });

  this.req.on('end', function() {
    var params  = querystring.decode(body);
    var payload = JSON.parse(params.payload);

    console.log(payload);
  });

  this.body = 'OK';
}));

app.listen(5000);
