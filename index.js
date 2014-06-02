/**
 * Notiwire
 * - A proxy between Notifiers and NotiPis
 */
var cradle     = require ('cradle'),
    winston    = require ('winston'),
    express    = require ('express'),
    request    = require ('request'),
    cheerio    = require ('cheerio'),
    expWinston = require ('express-winston'),

    affiliate  = require ('./affiliate'),
    config     = require ('./configuration'),
    app        = express ();

// CouchDB
cradle.setup(config.database.cradle);
var con = new (cradle.Connection);
var db  = con.database(config.database.name);

// Logging
app.use(expWinston.errorLogger({
    transports: [
        new winston.transports.File({
            filename: config.logging.path,
            json: true
        })
    ]
}));

winston.add(winston.transports.File, {
    filename: config.logging.path
});

/**
 * Splash
 * - A splash for clients who visit root
 */
app.get('/', function (req, res) {
    res.send('Notiwire ' + config.notiwire.version);
});

/**
 * Affiliates
 * - Receives data from NotiPis
 *
 * post api/v1/online/light  value (int)
 * post api/v1/online/coffee value (int)
 */
app.param('affiliate', function (req, res, next, affiliate) {
     var key = req.headers['X-api-key'] || undefined;

     if (key !== undefined)
         return next();
     else {
         var err = new Error ('Invalid api-key.');
         err.status = 401;
         return next(err);
     }
});

app.get(config.notiwire.api + '/:affiliate/light', function (err, req, res) {

});

app.post(config.notiwire.api + '/:affiliate/coffee', function (req, res) {

});

/**
 * Aggregator
 * - Returns data from websites in json
 *
 * get api/v1/news/online.ntnu.no
 * get api/v1/news/dusken.no
 * get api/v1/news/ntnu.no
 * get api/v1/news/sit.no
 */
app.get(config.notiwire.api + '/news/:resource', function (req, res) {

});

/**
 * Webserver
 * - Starts webserver.
 */
var server = app.listen(config.notiwire.port, function () {
    winston.log('success', 'Notiwire Running on port %d', server.address().port);
});

/**
 * Error handling
 * - Pipes Express errors to client as json
 */
app.use(function(err, req, res, next){
  //winston.log('error', err.message);
  res.json(err.status, {
    error: err.message
  });
});
