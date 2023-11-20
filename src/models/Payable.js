const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Payable = db.define('Payable', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('paid', 'waiting_funds'),
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'payables',
  timestamps: true,
});

module.exports = Payable;