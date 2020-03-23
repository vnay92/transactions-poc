/*jshint esversion: 9 */
/*jslint node: true */
'use strict';

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    return res.json({
        done: true,
        path: req.path
    });
});

module.exports = router;
