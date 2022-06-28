const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const userController = require('./user.controller');

router.use(bodyParser.json());

router.post('/create', (req, res) => {
        userController(req, res).create();
    },
);

router.post('/login', (req, res) => {
        userController(req, res).login();
    },
);

module.exports = router;
