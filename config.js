/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

const config = {
    db: {
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
};

module.exports = config;
