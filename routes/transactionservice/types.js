/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

const express = require('express');
const router = express.Router();

const TransactionController = require('controllers/TransactionController');
const transactionController = new TransactionController();

/* GET users listing. */
router.get('/:type', async (req, res) => {
    try {
        const response = await transactionController.getListOfTransactionIdsByType(req.params.type);
        return res.json(response);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
