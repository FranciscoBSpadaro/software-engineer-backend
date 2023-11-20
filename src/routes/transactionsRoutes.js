const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/TransactionsController');

router.post('/', transactionsController.create);
router.get('/', transactionsController.getAll);

module.exports = router;