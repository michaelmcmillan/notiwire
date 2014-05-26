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

app.get('/', function (req, res) {
    res.send('Notiwire 0.0.1');
});

/**
 * Affiliates
 * - Receives data from NotiPis
 *
 * post api/v1/online/light  value (int)
 * post api/v1/online/coffee value (int)
 */
app.param('affiliate', function(req, res, next, affiliate) {
     var key = req.headers['X-api-key'] || undefined;
     next();
});

app.post(config.notiwire.api + '/:affiliate/light', function (req, res) {

});

app.post(config.notiwire.api + '/:affiliate/coffee', function (req, res) {

});

/**
 * Aggregator
 * - Returns data from websites in a nice json format
 *
 * get api/v1/news/online.ntnu.no
 * get api/v1/news/dusken.no
 * get api/v1/news/ntnu.no
 * get api/v1/news/sit.no
 */
app.get(config.notiwire.api + '/news/:resource', function (req, res) {

});



// Boot server
var server = app.listen(config.notiwire.port, function() {
    console.log('[Notiwire]: Running on port %d', server.address().port);
});
