'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var router = (0, _express.Router)();

router.use('/add-product', function (req, res, next) {
    res.send('<h1>Add Product Page </h1><form action="product" method="POST"><input type="text"><button>Add Product</button></form>');
});
router.post('/product', function (req, res, next) {
    console.log(req.body);
    res.redirect('/');
});

exports.default = router;