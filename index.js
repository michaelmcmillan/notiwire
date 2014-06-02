/**
 * Notiwire
 * - A proxy between Notifiers and NotiPis
 */
var hat        = require ('hat'),
    cradle     = require ('cradle'),
    winston    = require ('winston'),
    express    = require ('express'),
    request    = require ('request'),
    cheerio    = require ('cheerio'),
    expWinston = require ('express-winston'),

    affiliate  = require ('./affiliate'),
    config     = require ('./configuration'),
    app        = express ();

/* CouchDB */
cradle.setup(config.database.cradle);
var con = new (cradle.Connection);
var db  = con.database(config.database.name);

/* Logging */
winston.add(winston.transports.File, {
    filename: config.logging.path
});

/**
 * Splash
 * - An unimpressive splash for clients who visit root
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
    var apiKey = req.headers['x-api-key'] || undefined;

    if (apiKey === undefined)
        return next(new Error ({status: 500, msg: "You must provide an api key."}));

    db.view('affiliates/getAllByApiKey', {key: apiKey},
        function (err, affiliate) {
            if (err)
                return next({status: 500, msg: "Database error, try again."});
            else if (affiliate[0]) {
                req.affiliate = affiliate[0];
                return next();
            }
            else
        return next({status: 401, msg: "Invalid API key."});
     });
});

app.get(config.notiwire.api + '/:affiliate/light', function (req, res) {
    res.json(200, {
        success: true,
        message: "Successfully received light update.",
        light: 85, // debug value
        affiliate: req.affiliate.value.name
    });
});

app.post(config.notiwire.api + '/:affiliate/coffee', function (req, res) {
    res.json(200, {
        success: true,
        message: "Successfully received coffee update.",
        coffeePots: 2, // debug value
        affiliate: req.affiliate.value.name
    });
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
    winston.log('success', 'Notiwire Running on port %d',
        server.address().port);
});

/**
 * Error handling
 * - Pipes Express errors to client as json
 */
app.use(function(err, req, res, next){
  console.log(err);

  if (err) {
      res.json(err.status, {message: err.msg});
      winston.log('error', err.status + ': ' + err.msg);
  }
  else
      next();
});
