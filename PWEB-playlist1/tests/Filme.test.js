import { Sequelize, DataTypes } from 'sequelize';
import defineFilme from '../models/Filme.js';

let sequelize;
let Filme;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
  Filme = defineFilme(sequelize, DataTypes);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Filme Model', () => {
  it('deve criar um filme válido', async () => {
    const filme = await Filme.create({
      titulo: 'Matrix',
      genero: 'Ficção',
      duracao: 136,
      ano_lancamento: 1999,
      nota_media: 9.0
    });

    expect(filme).toBeDefined();
    expect(filme.titulo).toBe('Matrix');
  });
});
