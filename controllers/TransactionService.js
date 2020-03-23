/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

const BaseController = require('controllers/BaseController');
const models = require('models');

class TransactionService extends BaseController {

    constructor() {
        super();
        this.model = models.transactions;
    }
}

module.exports = TransactionService;
