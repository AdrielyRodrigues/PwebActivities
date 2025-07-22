const { sequelize, Usuario } = require('../models/Index');
const { expect } = ('@jest/globals');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Usuario', () => {
  test('deve criar um usuário com sucesso', async () => {
    const usuario = await Usuario.create({
      login: 'joao123',
      nome: 'João da Silva',
    });

    expect(usuario).toBeDefined();
    expect(usuario.login).toBe('joao123');
  });

  test('não deve permitir login duplicado', async () => {
    await Usuario.create({ login: 'joao123', nome: 'João da Silva' });

    await expect(Usuario.create({
      login: 'joao123',
      nome: 'Outro João',
    })).rejects.toThrow();
  });
});
