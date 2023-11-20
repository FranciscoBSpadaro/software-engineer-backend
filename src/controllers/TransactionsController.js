const Transaction = require('../models/Transaction');

class TransactionsController {
  async create(req, res) {
    try {
      const transaction = await Transaction.create(req.body);
      return res.status(201).json(transaction);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao criar transação', error });
    }
  }

  async getAll(req, res) {
    try {
      const transactions = await Transaction.findAll();
      return res.status(200).json(transactions);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao recuperar transações', error });
    }
  }
}

module.exports = new TransactionsController();
