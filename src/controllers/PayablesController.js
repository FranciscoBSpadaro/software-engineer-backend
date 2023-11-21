const Payable = require('../models/Payable');
const Transaction = require('../models/Transaction');
const { Op } = require('sequelize');

class PayablesController {
  // Método para criar um novo registro pagável
  async create(req, res) {
    try {
      // Busca a transação correspondente
      const transaction = await Transaction.findByPk(req.body.transactionId);
      if (!transaction) {
        return res.status(404).json({ message: 'Transação não encontrada' });
      }

      // Calcula a taxa de processamento com base no método de pagamento
      const feePercentage =
        transaction.paymentMethod === 'debit_card' ? 0.03 : 0.05;
      // Calcula o valor que será realmente pago
      const amount = transaction.amount * (1 - feePercentage);
      // Define o status com base no método de pagamento
      const status =
        transaction.paymentMethod === 'debit_card' ? 'paid' : 'waiting_funds';
      // Define a data de pagamento com base no método de pagamento
      const paymentDate =
        transaction.paymentMethod === 'debit_card'
          ? new Date()
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      // Cria o registro pagável
      const payable = await Payable.create({
        transactionId: transaction.id,
        status,
        paymentDate,
        amount,
      });

      // Retorna o registro pagável criado
      return res.status(201).json(payable);
    } catch (error) {
      // Retorna um erro se algo der errado
      return res
        .status(500)
        .json({ message: 'Erro ao criar registro pagável', error });
    }
  }

  // Método para recuperar todos os registros pagáveis
  async getAll(req, res) {
    try {
      const payables = await Payable.findAll();
      return res.status(200).json(payables);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao recuperar registros pagáveis', error });
    }
  }

  // Método para recuperar a soma dos pagamentos realizados na última semana
  async getSum(req, res) {
    try {
      let startDate = new Date(); // A data atual
      let endDate = new Date();
      endDate.setDate(startDate.getDate() + 7); // Uma semana a partir da data atual

      // Calcula a soma dos pagamentos realizados na última semana
      const sum = await Payable.sum('amount', {
        where: {
          status: 'paid',
          createdAt: {
            [Op.gte]: startDate,
            [Op.lt]: endDate,
          },
        },
      });

      return res.status(200).json({ sum });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao recuperar a soma dos pagamentos', error });
    }
  }

  // Método para recuperar a soma dos pagamentos para uma semana específica
  async getSumForWeek(req, res) {
    // Pegando a data da query string
    const { date } = req.query;

    // Verifica se a data é válida
    if (!Date.parse(date)) {
      return res.status(400).json({ message: 'Data inválida' });
    }

    try {
      // Calcula a data de início e fim da semana
      let startDate = new Date(date);
      let endDate = new Date(date);
      endDate.setDate(startDate.getDate() + 7);

      // Calcula a soma dos pagamentos para a semana
      const sum = await Payable.sum('amount', {
        where: {
          status: 'paid',
          createdAt: {
            [Op.gte]: startDate,
            [Op.lt]: endDate,
          },
        },
      });

      // Retorna a soma dos pagamentos
      return res.status(200).json({ sum });
    } catch (error) {
      // Retorna um erro se algo der errado
      return res
        .status(500)
        .json({ message: 'Erro ao recuperar a soma dos pagamentos', error });
    }
  }

  // Método para recuperar o saldo do cliente
  async getBalance(req, res) {
    try {
      // Calcula o saldo disponível
      const available = await Payable.sum('amount', {
        where: { status: 'paid' },
      });
      const waitingFunds = await Payable.sum('amount', {
        where: { status: 'waiting_funds' },
      });

      return res.status(200).json({ available, waitingFunds });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao recuperar o saldo', error });
    }
  }
}

module.exports = new PayablesController();
