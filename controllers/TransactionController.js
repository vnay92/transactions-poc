/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

const models = require('models');
const bluebird = require('bluebird');
const BaseController = require('controllers/BaseController');

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

        if (!!data.parent_id) {
            const parentTransaction = await this.getOneByKey('transaction_id', data.parent_id);
            if (!parentTransaction) {
                throw new Error(`Parent Transaction with id: ${data.parent_id} Does Not Exist!`);
            }
        }

        return await super.create(data);
    }

    async getListOfTransactionIdsByType(req) {
        let ids = [];

        const results = await this.model.findAll({
            where: {
                type: req.params.type
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

    async sumAllSubTransactions(req) {
        let sum = 0;

        const firstNode = await this.getOneByKey('transaction_id', req.params.transactionId);
        if (!firstNode) {
            return sum;
        }

        sum = await this.sumChildTransactions(firstNode);

        return Number(firstNode.amount) + sum;
    }

    async sumChildTransactions(parent) {
        const childTransactions = await this.getAllByKey('parent_id', parent.transaction_id);
        if (childTransactions.length == 0) {
            return 0;
        }

        let childQueries = [];
        const sumChildFunction = async (child) => {
            const value = await this.sumChildTransactions(child);
            return Number(child.amount) + value;
        };

        childTransactions.map((child) => {
            childQueries.push(sumChildFunction(child));
        });

        const results = await bluebird.all(childQueries);
        return results.reduce((a, b) => a + b, 0);
    }
}

module.exports = TransactionService;
