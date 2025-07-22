const { sequelize, Musica } = require('../models/Index');
const { expect } = ('@jest/globals');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Musica', () => {
  test('deve criar uma música com sucesso', async () => {
    const musica = await Musica.create({
      titulo: 'Bohemian Rhapsody',
      artista: 'Queen',
      genero: 'Rock',
      duracao_segundos: 354,
      ano_lancamento: 1975,
      nota_media: 9.8,
    });

    expect(musica).toBeDefined();
    expect(musica.titulo).toBe('Bohemian Rhapsody');
  });

  test('deve rejeitar nota inválida', async () => {
    await expect(Musica.create({
      titulo: 'Erro',
      artista: 'Alguém',
      genero: 'Pop',
      duracao_segundos: 200,
      ano_lancamento: 2020,
      nota_media: 15,
    })).rejects.toThrow();
  });
});
