const { sequelize, Avaliacao, Usuario, Musica } = require('../models/Index');
const { expect } = ('@jest/globals');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Avaliacao', () => {
  test('deve criar uma avaliação válida', async () => {
    const usuario = await Usuario.create({ login: 'testeuser', nome: 'Teste' });
    const musica = await Musica.create({
      titulo: 'Exemplo',
      artista: 'Artista',
      genero: 'Jazz',
      duracao_segundos: 200,
      ano_lancamento: 2022,
    });

    const avaliacao = await Avaliacao.create({
      texto: 'Muito boa!',
      avaliacao: 9.5,
      usuarioId: usuario.id,
      musicaId: musica.id,
    });

    expect(avaliacao).toBeDefined();
    expect(avaliacao.texto).toMatch(/boa/i);
  });

  test('não deve permitir avaliação acima de 10', async () => {
    const usuario = await Usuario.create({ login: 'limituser', nome: 'Limite' });
    const musica = await Musica.create({
      titulo: 'Limite Música',
      artista: 'Limite Artista',
      genero: 'Indie',
      duracao_segundos: 300,
      ano_lancamento: 2023,
    });

    await expect(Avaliacao.create({
      texto: 'Inválida',
      avaliacao: 11,
      usuarioId: usuario.id,
      musicaId: musica.id,
    })).rejects.toThrow();
  });
});
