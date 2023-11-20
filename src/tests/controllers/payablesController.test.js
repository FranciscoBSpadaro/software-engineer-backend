const request = require('supertest');
const app = require('../../../app');

// Descrevendo o grupo de testes para o PayablesController
describe('PayablesController', () => {
  // Teste para a recuperação de todos os payables
  it('should be able to get all payables', async () => {
    // Faz uma requisição GET para a rota /payables
    const response = await request(app).get('/payables');

    // Verifica se a resposta tem o status 200 (OK)
    expect(response.status).toBe(200);
    // Verifica se o corpo da resposta é um array
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Teste para a criação de um novo payable
  it('should be able to create a new payable', async () => {
    // Faz uma requisição POST para a rota /payables
    const response = await request(app).post('/payables').send({
      value: 100.0,
      status: 'waiting_funds',
      paymentDate: '2022-01-01',
      transactionId: 1,
    });

    // Verifica se a resposta tem o status 201 (criado)
    expect(response.status).toBe(201);
    // Verifica se a resposta tem uma propriedade 'id'
    expect(response.body).toHaveProperty('id');
  });

  // Teste para verificar o tratamento de erros ao criar um payable
  it('should handle errors when creating a payable', async () => {
    // Faz uma requisição POST para a rota /payables com dados inválidos
    const response = await request(app).post('/payables').send({
      value: 'invalid_value', // Valor inválido
      status: 'waiting_funds',
      paymentDate: '2022-01-01',
      transactionId: 1,
    });

    // Verifica se a resposta tem o status 500 (erro interno do servidor)
    expect(response.status).toBe(500);
    // Verifica se a resposta tem uma propriedade 'message'
    expect(response.body).toHaveProperty('message');
  });
});
