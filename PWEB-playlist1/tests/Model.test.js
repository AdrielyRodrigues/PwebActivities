const { sequelize, Usuario, Musica, Playlist, Avaliacao } = require('../models/Index');
const { expect } = ('@jest/globals');

describe('Modelos básicos definidos', () => {
  test('Modelos estão definidos corretamente', () => {
    expect(Usuario).toBeDefined();
    expect(Musica).toBeDefined();
    expect(Playlist).toBeDefined();
    expect(Avaliacao).toBeDefined();
  });

  test('Conexão com Sequelize funciona', async () => {
    await expect(sequelize.authenticate()).resolves.not.toThrow();
  });
});
