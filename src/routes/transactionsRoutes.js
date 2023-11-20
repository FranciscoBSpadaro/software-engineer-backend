const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/TransactionsController');

router.post('/transactions', transactionsController.create);
router.get('/transactions', transactionsController.getAll);

module.exports = router;