import { sequelize } from './Index.js';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Cria as tabelas do zero antes dos testes
});

afterAll(async () => {
  await sequelize.close(); // Fecha a conexão após os testes
});