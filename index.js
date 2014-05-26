/**
 * Notiwire
 * - A proxy between Notifiers and NotiPis
 */
var express   = require ('express'),
    request   = require ('request'),
    cheerio   = require ('cheerio'),
    affiliate = require ('./affiliate'),
    config    = require ('./configuration'),
    app       = express ();

app.param('affiliate', function(req, res, next, affiliate) {
     var key = req.headers['X-api-key'] || undefined;
     next();
});

app.get(config.notiwire.api + '/:affiliate/light', function (req, res) {

});

app.get(config.notiwire.api + '/:affiliate/coffee', function (req, res) {

});

app.get('/', function (req, res) {
    res.send('Notiwire 0.0.1');
});

var server = app.listen(config.notiwire.port, function() {
    console.log('[Notiwire]: Running on port %d', server.address().port);
});
