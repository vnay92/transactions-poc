/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

const express = require('express');
const router = express.Router();

const TransactionController = require('controllers/TransactionController');
const transactionController = new TransactionController();

/* GET users listing. */
router.get('/:transactionId', async (req, res) => {
    try {
        const sum = await transactionController.sumAllSubTransactions(req);
        return res.json({
            sum
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            errors: [
                error.message
            ]
        });
    }
});

module.exports = router;
