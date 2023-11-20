const { DataTypes } = require('sequelize');
const db = require('../config/database');


const Transaction = db.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM('debit_card', 'credit_card'),
    allowNull: false,
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardHolderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardExpirationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cardVerificationCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'transactions',
  timestamps: true,
});

module.exports = Transaction;