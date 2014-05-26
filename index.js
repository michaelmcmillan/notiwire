/**
 * Notiwire
 */
var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express();

var config = {

    database: {

    },

    notiwire: {
        api: '/api/' + 'v1',
        port: '1337'
    }
}


app.param('affiliate', function(req, res, next, affiliate) {
     // Validate affiliate and key
     if (true) next();
});

app.get(config.notiwire.api + '/:affiliate/light', function (req, res) {

});

app.get(config.notiwire.api + '/:affiliate/coffee', function (req, res) {

});

var server = app.listen(config.notiwire.port, function() {
    console.log('[Notiwire]: Running on port %d', server.address().port);
});
