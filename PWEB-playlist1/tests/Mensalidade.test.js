const { sequelize } = require('../models/Index');
const { Mensalidade } = require('../models/Mensalidade');
const { Usuario } = require('../models/Index');
const { expect } = ('@jest/globals');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Mensalidade', () => {
  test('deve criar uma mensalidade válida', async () => {
    const usuario = await Usuario.create({
      login: 'mensal_user',
      nome: 'Usuário Mensal',
    });

    const mensalidade = await Mensalidade.create({
      valor: 49.9,
      vencimento: '2025-07-20',
      usuarioId: usuario.id,
    });

    expect(mensalidade).toBeDefined();
    expect(mensalidade.valor).toBe(49.9);
  });
});
