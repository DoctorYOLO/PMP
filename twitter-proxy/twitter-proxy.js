

require("http").createServer(function(request, response) {
	
    var OAuth = require('oauth');
    var oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        // Consumer key
        'dJtLRItiPkpsROdBg3XVmq8r3',
        // Consumer secret
        'USsbC1yzc0pWRpeGBeXxFMhnLSiTqPnWh6nT7SK4b41hhLKqYA',
        '1.0',
        null,
        'HMAC-SHA1'
    );

    oauth.get(
        'https://api.twitter.com' + request.url,
        // Access token
        '3025999949-fpO0igwsKWxg6CLYFeIrUOpWSpMPwoUdQal36G4',
        // Access token secret
        '48JVQ3MOGg0c1AtSLoLHFp6HiI8FevOPmZNBgkx4NPLbN',
        function (e, data, res) {
            if (e) {
                console.error(e);
            }

            response.writeHead(res.statusCode, res.headers);
            response.end(data);
        }
    );	
	
}).listen(8888);


console.log('HTTP server started on localhost:8888');
