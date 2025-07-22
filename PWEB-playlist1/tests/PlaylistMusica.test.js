const { sequelize, Playlist, Musica, PlaylistMusica } = require('../models/Index');
const { expect } = ('@jest/globals');

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Criar dependências
  const musica = await Musica.create({
    titulo: 'Imagine',
    artista: 'John Lennon',
    genero: 'Rock',
    duracao_segundos: 200,
    ano_lancamento: 1971,
    nota_media: 9.5,
  });

  const playlist = await Playlist.create({ nome: 'Clássicos' });

  // Relacionar
  await PlaylistMusica.create({
    playlistId: playlist.id,
    musicaId: musica.id,
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo PlaylistMusica', () => {
  test('deve criar relação entre música e playlist', async () => {
    const relacao = await PlaylistMusica.findOne();

    expect(relacao).toBeDefined();
    expect(relacao.playlistId).toBeDefined();
    expect(relacao.musicaId).toBeDefined();
  });
});
