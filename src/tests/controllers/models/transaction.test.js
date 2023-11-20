const request = require('supertest');
const app = require('../../../app');
const Transaction = require('../../../models/Transaction')

// Descrevendo o grupo de testes para o modelo Transaction
describe('Transaction', () => {
  // Antes de cada teste, limpa a tabela de transactions
  beforeEach(async () => {
    await Transaction.destroy({ where: {} });
  });

  // Teste para a criação de uma nova transaction
  it('should be able to create a new transaction', async () => {
    // Faz uma requisição POST para a rota /transactions
    const response = await request(app).post('/transactions').send({
      value: 100.0,
      description: 'Test transaction',
      paymentMethod: 'credit_card',
      cardNumber: '1234567812345678',
      cardHolderName: 'Test Holder',
      cardExpirationDate: '12/24',
      cardVerificationCode: '123',
    });

    // Verifica se a resposta tem o status 201 (criado)
    expect(response.status).toBe(201);
    // Verifica se a resposta tem uma propriedade 'id'
    expect(response.body).toHaveProperty('id');
  });

  // Teste para verificar o tratamento de erros ao criar uma transação sem cardNumber
  it('should return an error when creating a transaction without cardNumber', async () => {
    // Faz uma requisição POST para a rota /transactions sem cardNumber
    const response = await request(app).post('/transactions').send({
      value: 100.0,
      description: 'Test transaction',
      paymentMethod: 'credit_card',
      cardHolderName: 'Test Holder',
      cardExpirationDate: '12/24',
      cardVerificationCode: '123',
    });

    // Verifica se a resposta tem o status 400 (Bad Request)
    expect(response.status).toBe(400);
    // Verifica se a resposta tem uma propriedade 'message'
    expect(response.body).toHaveProperty('message');
  });
});
