'use strict';

var _http = require('http');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _admin = require('./routes/admin');

var _admin2 = _interopRequireDefault(_admin);

var _shop = require('./routes/shop');

var _shop2 = _interopRequireDefault(_shop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _bodyParser.urlencoded)({ extended: false }));

app.use(_admin2.default);
app.use(_shop2.default);

var server = (0, _http.createServer)(app);

server.listen(3000);