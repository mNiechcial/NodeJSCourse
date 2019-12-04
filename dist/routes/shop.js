'use strict';

var _express = require('express');

var router = (0, _express.Router)();

router.get('/', function (req, res, next) {
    res.send('<h1>Default</h1>');
});

exports = router;