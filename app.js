/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

// Load the configuration from ENV
require('dotenv').config();

// This helps us require modules without using relative paths.
// One can just use for e.g. require('entities/BaseEntity')
require('app-module-path').addPath(__dirname);

const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Hook to make sure the DB and Routes are registered before we
 * start listening on the port.
 */
const onBeforeStart = async () => {
    /**
     * End Router configuration
     */

    console.log('Setting up DB');
    const models = require('models');
    return await models.sequelize.sync();
};

app.onBeforeStart = async function (server, callback) {
    try {
        await onBeforeStart(server);
        return callback(null);
    } catch (error) {
        return callback(error);
    }
};

/**
 * Load the application routers dynamically
 */
let applicationRouters = require('./routes');
applicationRouters.map((route) => {
    console.log('Registering Routes');
    app.use(route.path, route.value);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
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
