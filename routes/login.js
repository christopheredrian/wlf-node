var express = require('express');
var customer = require('../models/customer');
var provider = require('../models/providers');
var registration = require('../models/registration');
var router = express.Router();
var ip = require('ip');

router.get('/', function (req, res, next) {
    // TODO: with error message
    res.render('login');
});

router.post('/', function (req, res, next) {
    var ipAddress = ip.address();
    ipAddress = 'localhost';
    //ipAddress = '192.168.1.5';
    var post = req.body;
    console.log('/login: -------------- ' + post.username + ":" + post.password);
    if (post.username === 'admin' && post.password === 'admin') {
        req.session.username = 1;
        res.redirect('/admin/');
    } else {
        registration.usernameExists(post.username, post.password, function (err, registrationExists) {
            if (registrationExists) {
                console.log('was here registrationexists' + registrationExists + ',' + post.username);
                res.redirect('/pending.html');
            } else {
                // Check on customers and providers
                customer.usernameExists(post.username, post.password, function (err, customerExists) {
                    // res.send(customerExists);
                    if (customerExists.length > 0) {

                        console.log('was here' + customerExists + ',' + post.username + ',' + post.password);
                        console.log('a customer');
                        var cu_id = customerExists[0].cu_id + '';
                        res.redirect("http://" + ipAddress + '/Customer_Module/auth/login.php?cu_id=' + cu_id);
                    } else {
                        // check if provider
                        provider.usernameExists(post.username, post.password, function (err, providerExists) {
                            if (providerExists.length > 0) {
                                // console.log('a provider' + '\n' + providerExists);
                                var sp_id = providerExists[0]['sp_id'] + '';
                                res.redirect("http://" + ipAddress + ":8084/WebApplication4/login?username=" + post.username + '&sp_id=' + sp_id);
                            } else {
                                console.log('invalid');
                                res.render('login', {
                                    error: 'Invalid credentials!'
                                });
                            }
                        });

                    }
                });
            }

        })

    }
});

module.exports = router;

// var request = require('request');
//
// // Set the headers
// var headers = {
//     'User-Agent':       'Super Agent/0.0.1',
//     'Content-Type':     'application/x-www-form-urlencoded'
// }
//
// // Configure the request
// var options = {
//     url: 'http://samwize.com',
//     method: 'POST',
//     headers: headers,
//     form: {'key1': 'xxx', 'key2': 'yyy'}
// }
//
// // Start the request
// request(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         // Print out the response body
//         console.log(body)
//     }
// })
