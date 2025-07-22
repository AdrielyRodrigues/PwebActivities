import { sequelize, Canal } from  '../models/Index.js';
const { expect } = ('@jest/globals');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Canal', () => {
  test('deve criar um canal com todos os campos obrigatórios', async () => {
    const canal = await Canal.create({
      nome: 'Canal de Rock',
      data_criacao: new Date('2022-01-01'),
      genero_tema: 'Rock',
    });

    expect(canal).toBeDefined();
    expect(canal.nome).toBe('Canal de Rock');
    expect(canal.genero_tema).toBe('Rock');
    expect(new Date(canal.data_criacao)).toBeInstanceOf(Date);
  });

  test('deve lançar erro se faltar o nome', async () => {
    await expect(
      Canal.create({
        data_criacao: new Date(),
        genero_tema: 'Pop',
      })
    ).rejects.toThrow('notNull Violation');
  });

  test('deve lançar erro se faltar a data de criação', async () => {
    await expect(
      Canal.create({
        nome: 'Canal sem data',
        genero_tema: 'Indie',
      })
    ).rejects.toThrow('notNull Violation');
  });

  test('deve lançar erro se faltar o gênero/tema', async () => {
    await expect(
      Canal.create({
        nome: 'Canal misterioso',
        data_criacao: new Date(),
      })
    ).rejects.toThrow('notNull Violation');
  });
});
