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

    async create(req) {
        const data = {
            transaction_id: req.params.transactionId,
            ...req.body
        };

        return await super.create(data);
    }

    async getListOfTransactionIdsByType(type) {
        let ids = [];

        const results = await this.model.findAll({
            where: {
                type: type
            },
            attributes: [
                'transaction_id'
            ]
        });

        results.map((result) => {
            ids.push(result.transaction_id);
        });

        return ids;
    }
}

module.exports = TransactionService;
