/**
 * Configuration
 */
var config = {

    database: {
        name: "notiwire",
        cradle: {
            host: 'localhost',
            cache: true,
            raw: false,
            forceSave: true
        }
    },

    notiwire: {
        api: '/api/' + 'v1',
        port: '1337',
        version: '0.0.1'
    },

    logging: {
        path: 'logs/notiwire.log'
    }
}

module.exports = config;
