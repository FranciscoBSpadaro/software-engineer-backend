const express = require('express');
const PayablesController = require('../controllers/PayablesController');

const router = express.Router();

// Rota para criar um registro pagável
router.post('/', PayablesController.create);

// Rota para recuperar todos os registros pagáveis
router.get('/', PayablesController.getAll);

module.exports = router;