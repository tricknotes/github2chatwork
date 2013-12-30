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
  var branch   = payload.ref.replace(/^refs\/heads\//, '');
  var message  = [
    '[info][title]' + '@' + payload.pusher.name + 'さんが push しました' + '[/title]',
    'ブランチ: ' + branch + '( ' + payload.repository.url + '/tree/' + branch + ' )',
    '内容を見る: ' + payload.compare,
    '[hr]',
    payload.commits.map(function(commit) {
      // return commit.message + ' ' + commit.url; // chatwork で見栄えが悪いので一旦コメントアウト
      return '* ' + commit.message;
    }).join('\n'),
    '[/info]'
  ].join('\n');

  client.post(endpoint , {body: message});

  this.body = 'OK';
}));

app.listen(PORT);
