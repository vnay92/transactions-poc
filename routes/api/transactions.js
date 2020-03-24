/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const TransactionController = require('controllers/TransactionController');
const transactionController = new TransactionController();

/* GET all resources. */
router.get('/', async (req, res) => {
    const response = await transactionController.getAll();
    return res.json(response);
});

router.get('/:transactionId', async (req, res) => {
    const response = await transactionController.getOneByKey('transaction_id', req.params.transactionId);
    return res.json(response);
});

router.put('/:transactionId', [
    check('amount').isInt(),
    check('type').isString()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({
                errors: errors.array()
            });
    }

    try {
        await transactionController.create(req);
        return res.json({
            status: 'ok'
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

router.get('/:transactionId/sum', async (req, res) => {
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

router.post('/:transactionId', [
    check('amount').isInt(),
    check('type').isString()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({
                errors: errors.array()
            });
    }

    try {
        await transactionController.create(req);
        return res.json({
            status: 'ok'
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
