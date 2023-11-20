const request = require('supertest'); // Usada para fazer requisições para a aplicação
const app = require('../../app');

// Descrevendo o grupo de testes para o BalanceController
describe('BalanceController', () => {
  // Teste para a recuperação do saldo
  it('should be able to get the balance', async () => {
    // Faz uma requisição GET para a rota /balance
    // Envia uma query string com a data
    const response = await request(app)
      .get('/balance')
      .query({ date: '2022-01-01' });

    // Verifica se a resposta tem o status 200 (OK)
    expect(response.status).toBe(200);
    // Verifica se a resposta tem uma propriedade 'available'
    expect(response.body).toHaveProperty('available');
    // Verifica se a resposta tem uma propriedade 'waitingFunds'
    expect(response.body).toHaveProperty('waitingFunds');
  });

  // Teste para verificar se o saldo disponível é calculado corretamente
  it('should calculate the available balance correctly', async () => {
    // Aqui você deve implementar a lógica para verificar se o saldo disponível é calculado corretamente
  });

  // Teste para verificar se o saldo a receber é calculado corretamente
  it('should calculate the waiting funds balance correctly', async () => {
    // Aqui você deve implementar a lógica para verificar se o saldo a receber é calculado corretamente
  });
});