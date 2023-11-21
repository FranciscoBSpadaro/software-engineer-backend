const express = require('express');
const PayablesController = require('../controllers/PayablesController');

const router = express.Router();

// Rota para criar um registro pagável
router.post('/', PayablesController.create);

// Rota para recuperar todos os registros pagáveis
router.get('/', PayablesController.getAll);

// Rota para recuperar o saldo do cliente
router.get('/client-balance', PayablesController.getBalance);
// Rota para recuperar a soma dos pagamentos para uma semana específica
router.get('/client-balance-week', PayablesController.getSumForWeek);

// Rota para recuperar a soma dos pagamentos pagos em uma semana
router.get('/sum', PayablesController.getSum);

module.exports = router;