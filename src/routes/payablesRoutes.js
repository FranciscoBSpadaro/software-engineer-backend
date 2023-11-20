const express = require('express');
const PayablesController = require('../controllers/PayablesController');

const router = express.Router();

// Rota para criar um registro pagável
router.post('/', PayablesController.create);

// Rota para recuperar todos os registros pagáveis
router.get('/', PayablesController.getAll);

// Rota para recuperar a soma dos pagamentos pagos em uma semana
router.get('/sum', PayablesController.getSum);

module.exports = router;