var hat        = require ('hat'),
    cradle     = require ('cradle'),
    config     = require ('./configuration');

// CouchDB
cradle.setup(config.database.cradle);
var con = new (cradle.Connection);
var db  = con.database(config.database.name);

// Assign apikeys for every entry without one
/*db.view('affiliates/getAll', function (err, res) {
    if (err) console.log(err);
    res.forEach(function (key, row, id) {
          console.log("%s is an %s with key %s.", row.name, row.type, row.apiKey);

          if (row.apiKey === undefined)
              db.merge(id, {apiKey: hat()}, function (err, res) {
                  console.log(err, res);
              });
    });
});
*/

// Validate apikey


db.view('affiliates/getAllByApiKey', {key: '21caa19142e609e80c1780048204ed12'}, function (err, doc) {
      console.log(doc);
 });
