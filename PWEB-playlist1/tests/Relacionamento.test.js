const { sequelize, Usuario, Musica, Avaliacao, Playlist } = require('../models/Index');
const { expect } = ('@jest/globals');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Relacionamentos', () => {
  test('Usuário pode ter várias avaliações', async () => {
    const usuario = await Usuario.create({ login: 'reluser', nome: 'Relacional' });
    const musica = await Musica.create({
      titulo: 'Relacional Música',
      artista: 'Relacional Artista',
      genero: 'Rock',
      duracao_segundos: 250,
      ano_lancamento: 2020,
    });

    await Avaliacao.create({
      texto: 'Muito boa!',
      avaliacao: 8.5,
      usuarioId: usuario.id,
      musicaId: musica.id,
    });

    const avaliacoes = await usuario.getAvaliacoes();
    expect(avaliacoes.length).toBe(1);
  });

  test('Playlist pode conter músicas (N:N)', async () => {
    const musica = await Musica.create({
      titulo: 'Playlist Song',
      artista: 'Artist',
      genero: 'Pop',
      duracao_segundos: 180,
      ano_lancamento: 2019,
    });

    const playlist = await Playlist.create({ nome: 'Minhas Músicas' });

    await playlist.addMusica(musica);
    const musicas = await playlist.getMusicas();

    expect(musicas.length).toBe(1);
    expect(musicas[0].titulo).toBe('Playlist Song');
  });
});
