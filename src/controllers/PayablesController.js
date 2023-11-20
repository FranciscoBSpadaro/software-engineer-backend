const Payable = require('../models/Payable');

class PayablesController {
  async create(req, res) {
    try {
      const payable = await Payable.create(req.body);
      return res.status(201).json(payable);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao criar registro pagável', error });
    }
  }

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

  async getSum(req, res) {
    try {
      let startDate = new Date(); // A data atual
      let endDate = new Date();
      endDate.setDate(startDate.getDate() + 7); // Uma semana a partir da data atual

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
}

module.exports = new PayablesController();
