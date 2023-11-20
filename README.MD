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
4. Criar um banco de dados PostgreSQL usando Docker, você pode usar a imagem oficial do PostgreSQL do Docker Hub. 
   - Aqui estão os passos:
   - Primeiro, você precisa instalar o Docker em seu sistema, se ainda não o fez. Você pode baixá-lo do site oficial do Docker.
   - Em seguida, você pode executar o seguinte comando no terminal powershell para criar e iniciar um contêiner Docker com PostgreSQL:
   - `docker run --name api-pagamentos -e POSTGRES_PASSWORD=sua_senha_postgres -d -p 5432:5432 postgres`
   - Depois criar o banco de dados no servidor PostgreSQL
   - `docker exec -it api-pagamentos psql -U postgres -c "CREATE DATABASE nome_do_seu_banco_de_dados;"`
   - o usuario padrão para login no db é postgres
   - verifique se o db foi criado : `docker exec -it api-pagamentos psql -U postgres -c "\l"`
5. Crie seu arquivo .env
```
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=nome_do_seu_banco_de_dados
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_postgres
NODE_ENV=development
```
6. Execute as migrações com `npm run migrate`
7. Inicie o servidor com `npm start ou npm run dev`
8. tambem é possivel excluir as tabelas do db com `npm run drop`

## Como Testar

Execute os testes com `npm test`

## Serviços Disponibilizados

- POST `/transactions` - para criar uma nova transação
- GET `/transactions` - para listar todas as transações
- POST `/payables` - para criar um novo payable
- GET `/payables` - para listar todos os payables
- GET `/balance` - para consultar o saldo do cliente
- Rotas disponibilizadas no arquivo insomnia na raiz do projeto

## Contribuição

Este é um projeto aberto. Sinta-se à vontade para contribuir.