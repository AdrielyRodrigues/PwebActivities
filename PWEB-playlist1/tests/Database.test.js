const { sequelize } = require('../models/Index');
const { expect } = ('@jest/globals');

describe('Conexão com o banco de dados', () => {
  test('Deve autenticar com sucesso', async () => {
    await expect(sequelize.authenticate()).resolves.not.toThrow();
  });
});
