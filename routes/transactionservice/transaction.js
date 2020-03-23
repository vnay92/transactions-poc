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
        return res.status(500).send(error);
    }
});

module.exports = router;
