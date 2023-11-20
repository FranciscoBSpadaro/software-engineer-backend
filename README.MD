# Projeto PSP Simplificado

Este projeto é uma versão super simplificada de um Payment Service Provider (PSP). 
Ele permite processar transações e gerenciar pagamentos para clientes.
Ao Acessar o Repositório [Pagar.me](https://github.com/pagarme/vagas/tree/master/desafios) vi que eles tinham esse desafios entao resolvi me desafiar embora não participo de nenhum processo seletivo.
como gostei da ideia estou desenvolvendo essa api para usar no meu projeto de e-commerce que está privado no momento.

## Funcionalidades

Processamento de transações com as seguintes informações:

- Valor da transação
- Descrição da transação
- Método de pagamento (debit_card ou credit_card)
- Número do cartão
- Nome do portador do cartão
- Data de validade do cartão
- Código de verificação do cartão (CVV)

- Listagem das transações já criadas
- Armazenamento seguro do número do cartão, mantendo apenas os 4 últimos dígitos visíveis
- Criação de recebíveis (payables) com regras específicas para cartões de débito e crédito
- Desconto da taxa de processamento (fee) no momento da criação dos payables
- Consulta de saldo do cliente, mostrando o saldo disponível (available) e o saldo a receber (waiting_funds)

## Tecnologias Utilizadas

- Node.js
- Banco de dados (PostgreSQL)

## Como Executar

1. Clone este repositório
2. Instale as dependências com `npm install`
3. Configure o banco de dados no arquivo `config/database.js`
4. Execute as migrações com `npx sequelize db:migrate`
5. Inicie o servidor com `npm start`

## Como Testar

Execute os testes com `npm test`

## Serviços Disponibilizados

- POST `/transactions` - para criar uma nova transação
- GET `/transactions` - para listar todas as transações
- POST `/payables` - para criar um novo payable
- GET `/payables` - para listar todos os payables
- GET `/balance` - para consultar o saldo do cliente

## Contribuição

Este é um projeto aberto. Sinta-se à vontade para contribuir.