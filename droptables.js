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

    await pool.query(`DROP TABLE IF EXISTS Transactions;`);
    await pool.query(`DROP TABLE IF EXISTS Payables;`);

    console.log('Tabelas excluídas');
    pool.end();
  }
});