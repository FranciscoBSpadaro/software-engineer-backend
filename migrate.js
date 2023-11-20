const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

pool.connect(async err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Transactions (
        id SERIAL PRIMARY KEY,
        amount DECIMAL(10, 2) NOT NULL,
        description VARCHAR(255) NOT NULL,
        paymentMethod VARCHAR(255) NOT NULL,
        cardNumber VARCHAR(255) NOT NULL,
        cardHolderName VARCHAR(255) NOT NULL,
        cardExpirationDate DATE NOT NULL,
        cardVerificationCode VARCHAR(255) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Payables (
        id SERIAL PRIMARY KEY,
        transactionId INTEGER NOT NULL,
        status VARCHAR(255) NOT NULL,
        paymentDate DATE NOT NULL,
        amount DECIMAL(10, 2) NOT NULL
      );
    `);

    console.log('Migração concluída');
    pool.end();
  }
});