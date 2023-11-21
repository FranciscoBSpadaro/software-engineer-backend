const Payable = require('../models/Payable');
const { Op } = require('sequelize');

class BalanceController {
  async getBalance(req, res) {
    // Pegando a data da query string
    const { date } = req.query;
    // Verifica se a data é válida
    if (!Date.parse(date)) {
      return res.status(400).json({ message: 'Data inválida' });
    }

    try {
      // Calculando o saldo disponível
      // Filtrando por status 'paid' e data de criação
      const available = await Payable.sum('amount', {
        where: {
          status: 'paid',
          createdAt: {
            // A data de criação deve ser maior ou igual à data fornecida
            [Op.gte]: new Date(date),
            // E menor que a data fornecida mais um dia
            [Op.lt]: new Date(
              new Date(date).setDate(new Date(date).getDate() + 1),
            ),
          },
        },
      });

      // Calculando o saldo a receber
      // Filtrando por status 'waiting_funds' e data de criação
      const waitingFunds = await Payable.sum('amount', {
        where: {
          status: 'waiting_funds',
          createdAt: {
            // A data de criação deve ser maior ou igual à data fornecida
            [Op.gte]: new Date(date),
            // E menor que a data fornecida mais um dia
            [Op.lt]: new Date(
              new Date(date).setDate(new Date(date).getDate() + 1),
            ),
          },
        },
      });

      // Retornando o saldo disponível e o saldo a receber
      return res.status(200).json({ available, waitingFunds });
    } catch (error) {
      // Retornando erro caso algo dê errado
      return res
        .status(500)
        .json({ message: 'Erro ao recuperar o saldo', error });
    }
  }
}

// Exportando a instância do controlador
module.exports = new BalanceController();
