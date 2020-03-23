/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

const config = require('config.js');
const Sequelize = require('sequelize');
const cls = require('continuation-local-storage');
const namespace = cls.createNamespace('pocket-aces');

let models = {};
Sequelize.cls = namespace;

const logger = function (query, time) {
    console.log(JSON.stringify({query, time}));
};

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, Object.assign({}, config.db, {
    dialectOptions: {
        multipleStatements: true
    },
    benchmark: true,
    logging: logger,
    pool: {
        max: 200,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}));

const modelFiles = [
    'transactions.js'
];

// Import models from the files
modelFiles.forEach(function (modelFile) {
    let model = sequelize.import(modelFile);
    models[model.name] = model;
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
models.namespace = namespace;

module.exports = models;
