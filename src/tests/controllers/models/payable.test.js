const request = require('supertest');
const app = require('../../../app');
const Payable = require('../../../models/Payable')

// Descrevendo o grupo de testes para o modelo Payable
describe('Payable', () => {
  // Antes de cada teste, limpa a tabela de payables
  beforeEach(async () => {
    await Payable.destroy({ where: {} });
  });

  // Teste para a criação de um novo payable
  it('should be able to create a new payable', async () => {
    // Faz uma requisição POST para a rota /payables
    const response = await request(app).post('/payables').send({
      transactionId: 1,
      status: 'paid',
      paymentDate: new Date(),
      amount: 100.0,
    });

    // Verifica se a resposta tem o status 201 (criado)
    expect(response.status).toBe(201);
    // Verifica se a resposta tem uma propriedade 'id'
    expect(response.body).toHaveProperty('id');
  });

  // Teste para a recuperação de todos os payables
  it('should be able to get all payables', async () => {
    // Faz uma requisição GET para a rota /payables
    const response = await request(app)
      .get('/payables');

    // Verifica se a resposta tem o status 200 (OK)
    expect(response.status).toBe(200);
    // Verifica se o corpo da resposta é um array
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Teste para verificar o tratamento de erros ao criar um payable sem transactionId
  it('should return an error when creating a payable without transactionId', async () => {
    // Faz uma requisição POST para a rota /payables sem transactionId
    const response = await request(app).post('/payables').send({
      status: 'paid',
      paymentDate: new Date(),
      amount: 100.0,
    });

    // Verifica se a resposta tem o status 400 (Bad Request)
    expect(response.status).toBe(400);
    // Verifica se a resposta tem uma propriedade 'message'
    expect(response.body).toHaveProperty('message');
  });
});