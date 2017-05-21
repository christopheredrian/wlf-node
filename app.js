var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var signup = require('./routes/signup');
var login = require('./routes/login');
var logout = require('./routes/logout');
var admin = require('./routes/admin');
var users = require('./routes/users');
var event = require('./routes/event');
var customers = require('./routes/customers');
var registration = require('./routes/registration');
var providers = require('./routes/providers');
var invoice = require('./routes/invoice');

var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('express-ejs-extend')); // add this line
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: null
    },
    resave: false,
    saveUninitialized: true,
}));

app.use('/test', function (req, res) {
    var customer = require('./models/registration');
    customer.usernameExists('ad', function (err, result) {
        res.end(result.toString());
    });
});
// app.use('/', index);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);

// Authentication
app.use(function (req, res, next) {
    if (!req.session.username) {
        res.render('login', {
            error: 'Please login!'
        });
    } else {
        next();
    }
});
// Routes below requires user authentication
app.use('/admin/', admin);
app.use('/admin/event', event);
app.use('/admin/users', users);
app.use('/admin/customers', customers);
app.use('/admin/registration', registration);
app.use('/admin/providers', providers);
app.use('/admin/invoice', invoice);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
