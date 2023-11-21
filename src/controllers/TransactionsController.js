const crypto = require('crypto');
const Transaction = require('../models/Transaction');

class TransactionsController {
  async create(req, res) {
    try {
      // Gere uma chave segura e um IV
      const key = crypto.scryptSync('a secure password', 'salt', 32);
      const iv = crypto.randomBytes(16);

      // Criptografe o número do cartão
      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      let cardNumberEncrypted = cipher.update(req.body.cardNumber, 'utf8', 'hex');
      cardNumberEncrypted += cipher.final('hex');

      // Salve os últimos 4 dígitos do número do cartão
      const cardLastFourDigits = req.body.cardNumber.slice(-4);

      // Crie a transação com o número do cartão criptografado e os últimos 4 dígitos
      const transaction = await Transaction.create({
        ...req.body,
        cardNumberEncrypted: cardNumberEncrypted,
        cardLastFourDigits: cardLastFourDigits,
      });

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
