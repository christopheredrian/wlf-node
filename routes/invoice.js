var express = require('express');
var invoice = require('../models/invoice');
var formatCurrency = require('format-currency');
var router = express.Router();
var opts = {format: '%s%v', symbol: '₱'};

router.get('/list', function (req, res, next) {
    invoice.getAll(function (err, rows) {
        rows.forEach(function (val) {
            val.Amount = formatCurrency(val.Amount, opts);
        })
        if (err) console.log(err);
        res.render('invoice/list', {
            'results': rows
        });
    });

});

module.exports = router;