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
}

module.exports = new PayablesController();
