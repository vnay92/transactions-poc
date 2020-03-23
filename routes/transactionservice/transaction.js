/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

const express = require('express');
const router = express.Router();

const TransactionServiceController = require('controllers/TransactionService');
const transactionServiceController = new TransactionServiceController();

/* GET users listing. */
router.get('/', async (req, res) => {

    const response = await transactionServiceController.getAll();
    return res.json(response);
});

module.exports = router;
