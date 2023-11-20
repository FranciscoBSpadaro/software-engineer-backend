const express = require('express');
const BalanceController = require('../controllers/BalanceController');

const router = express.Router();

// Rota para recuperar o saldo
router.get('/', BalanceController.getBalance);

module.exports = router;