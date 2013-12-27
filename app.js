var querystring = require('querystring');

var koa    = require('koa');
var route  = require('koa-route');
var parse  = require('co-body');

var chatwork = require('./lib/chatwork');
var client   = chatwork(process.env.CHATWORK_API_TOKEN);
var PORT     = process.env.PORT || 5000;

var app = koa();

app.use(route.post('/chatwork/:room_id', function *(room_id) {
  var params   = yield parse(this);
  var payload  = JSON.parse(params.payload);
  var endpoint = 'rooms/' + room_id + '/messages';
  var message  = [
    '(bot)',
    '@' + payload.pusher.name + 'さんが push しました:',
    '> ' + payload.compare
  ].join('\n');

  client.post(endpoint , {body: message});

  this.body = 'OK';
}));

app.listen(PORT);
