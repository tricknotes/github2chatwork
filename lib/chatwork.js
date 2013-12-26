var https       = require('https');
var querystring = require('querystring');

module.exports = function(token) {
  return new Chatwork(token);
};

function Chatwork(token) {
  this.token = token;
}

Chatwork.prototype.apiVersion = 'v1';

// TODO Support other request method if it needed

Chatwork.prototype.post = function (path, params) {
  // TODO Send params as request body
  params = querystring.encode(params);

  var options = {
    headers: {
      'X-ChatWorkToken': this.token
    },
    hostname: 'api.chatwork.com',
    port: 443,
    path: ['', this.apiVersion, path + '?' + params].join('/'),
    method: 'POST'
  };

  var req = https.request(options, function(res) {
    // TODO What should I do?

    res.on('data', function(chunk) {
      console.info(String(chunk));
    });
  });

  // TODO Handle error
  req.on('error', function(error) {
    console.error(error);
  });

  req.end();
};
