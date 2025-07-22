import { sequelize, Playlist } from  '../models/Index.js';
const { expect } = ('@jest/globals');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Playlist', () => {
  test('deve criar uma playlist com nome', async () => {
    const playlist = await Playlist.create({
      nome: 'Minhas Favoritas',
    });

    expect(playlist).toBeDefined();
    expect(playlist.nome).toBe('Minhas Favoritas');
  });

  test('deve lançar erro se o nome for vazio', async () => {
    await expect(
      Playlist.create({})
    ).rejects.toThrow('notNull Violation');
  });
});
