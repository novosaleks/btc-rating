const express = require('express');
const router = express.Router();

const btcRateController = require('./btcRate.controller');

router.get('', (req, res) => {
    btcRateController(req, res).getRate();
});

module.exports = router;
