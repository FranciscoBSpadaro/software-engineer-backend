const express = require('express');
const PayablesController = require('../controllers/PayablesController');

const router = express.Router();

// Rota para criar um registro pagável
router.post('/payables', PayablesController.create);

// Rota para recuperar todos os registros pagáveis
router.get('/payables', PayablesController.getAll);

module.exports = router;