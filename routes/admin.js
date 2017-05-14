var express = require('express');
var router = express.Router();

var registration = require('../models/registration');
var customer = require('../models/customer');
var provider = require('../models/providers');
var invoice = require('../models/invoice');
var event = require('../models/event');

var formatCurrency = require('format-currency');
var opts = {format: '%s%v', symbol: '₱'};


/* GET users listing. */
router.get('/', function (req, res, next) {
    registration.getAll(function (err, results) {
        var pendingRegistration = results.filter(function (obj) {
            return obj.status === 'Pending';
        });
        customer.getAll(function (err, customerResults) {
            provider.getAll(function (err, providerResults) {
                invoice.getAll(function (err, invoiceResults) {
                    event.getAll(5, function (err, eventResults) {
                        var calendarData = [];
                        eventResults.forEach(function (val) {
                            // peso sign in currency
                            calendarData.push({
                                title: val.Service,
                                start: val.Date
                            });
                            val.Price = formatCurrency(val.Price, opts);
                            val.Date = val.Date.toLocaleDateString() + ' ' +
                                val.Date.toLocaleTimeString();
                        });
                        console.log(calendarData);
                        var results = {
                            pendingRegistrationCount: pendingRegistration.length,
                            customerCount: customerResults.length,
                            providerCount: providerResults.length,
                            invoiceCount: invoiceResults.length,
                            events: eventResults,
                            calendarData: calendarData
                        };
                        res.render('dashboard', results);
                    });
                });
            });
        });

    });

});


module.exports = router;
