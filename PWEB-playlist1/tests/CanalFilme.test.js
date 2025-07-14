import { Sequelize, DataTypes } from 'sequelize';
import defineCanalFilme from '../models/CanalFilme.js';

let sequelize;
let CanalFilme;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
  CanalFilme = defineCanalFilme(sequelize, DataTypes);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo CanalFilme', () => {
  test('deve criar um CanalFilme válido', async () => {
    const recomendacao = await CanalFilme.create({
      id_canal: 1,
      id_filme: 10,
      data_recomendacao: new Date('2025-07-01'),
    });

    expect(recomendacao.id).toBeDefined();
    expect(recomendacao.id_canal).toBe(1);
    expect(recomendacao.id_filme).toBe(10);
    expect(new Date(recomendacao.data_recomendacao)).toEqual(new Date('2025-07-01'));
  });

  test('deve usar a data atual como padrão se não for fornecida', async () => {
    const recomendacao = await CanalFilme.create({
      id_canal: 2,
      id_filme: 20,
    });

    expect(recomendacao.data_recomendacao).toBeDefined();
    expect(recomendacao.id_canal).toBe(2);
    expect(recomendacao.id_filme).toBe(20);
  });

  test('deve falhar se id_canal não for fornecido', async () => {
    await expect(CanalFilme.create({
      id_filme: 5,
      data_recomendacao: new Date(),
    })).rejects.toThrow();
  });

  test('deve falhar se id_filme não for fornecido', async () => {
    await expect(CanalFilme.create({
      id_canal: 3,
      data_recomendacao: new Date(),
    })).rejects.toThrow();
  });
});