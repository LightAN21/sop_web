const express = require('express');
const bodyParser = require('body-parser');

function express_use(app) {
    app.use(express.static('client'));

    app.use(bodyParser.json({
        limit: '5mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '5mb',
        parameterLimit: 100000,
        extended: false
    }));
}

module.exports = express_use;