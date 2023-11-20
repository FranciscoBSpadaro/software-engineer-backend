const request = require('supertest');
const app = require('../../app');

// Descrevendo o grupo de testes para o TransactionsController
describe('TransactionsController', () => {
  // Teste para a recuperação de todas as transações
  it('should be able to get all transactions', async () => {
    // Faz uma requisição GET para a rota /transactions
    const response = await request(app).get('/transactions');

    // Verifica se a resposta tem o status 200 (OK)
    expect(response.status).toBe(200);
    // Verifica se o corpo da resposta é um array
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Teste para a criação de uma nova transação
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
});
