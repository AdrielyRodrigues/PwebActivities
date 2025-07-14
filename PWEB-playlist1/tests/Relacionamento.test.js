import { Sequelize, DataTypes } from 'sequelize';
import defineUsuario from '../models/Usuario.js';
import defineFilme from '../models/Filme.js';
import defineCanal from '../models/Canal.js';
import defineCanalFilme from '../models/CanalFilme.js';
import definePlaylist from '../models/Playlist.js';
import definePlaylistFilme from '../models/PlaylistFilme.js';
import defineComentario from '../models/Comentario.js';
import defineMensalidade from '../models/Mensalidade.js';
import { expect } from 'chai';

let sequelize;
let Usuario, Filme, Canal, CanalFilme, Playlist, PlaylistFilme, Comentario, Mensalidade;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  Usuario = defineUsuario(sequelize, DataTypes);
  Filme = defineFilme(sequelize, DataTypes);
  Canal = defineCanal(sequelize, DataTypes);
  CanalFilme = defineCanalFilme(sequelize, DataTypes);
  Playlist = definePlaylist(sequelize, DataTypes);
  PlaylistFilme = definePlaylistFilme(sequelize, DataTypes);
  Comentario = defineComentario(sequelize, DataTypes);
  Mensalidade = defineMensalidade(sequelize, DataTypes);

  // Relacionamentos
  Usuario.hasMany(Playlist, { foreignKey: 'id_usuario' });
  Playlist.belongsTo(Usuario, { foreignKey: 'id_usuario' });

  Usuario.hasMany(Comentario, { foreignKey: 'id_usuario' });
  Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });

  Filme.hasMany(Comentario, { foreignKey: 'id_filme' });
  Comentario.belongsTo(Filme, { foreignKey: 'id_filme' });

  Playlist.belongsToMany(Filme, { through: PlaylistFilme, foreignKey: 'id_playlist', otherKey: 'id_filme', as: 'filmes' });
  Filme.belongsToMany(Playlist, { through: PlaylistFilme, foreignKey: 'id_filme', otherKey: 'id_playlist' });

  Filme.belongsToMany(Canal, { through: CanalFilme, foreignKey: 'id_filme', otherKey: 'id_canal' });
  Canal.belongsToMany(Filme, { through: CanalFilme, foreignKey: 'id_canal', otherKey: 'id_filme' });

  Usuario.hasMany(Mensalidade, { foreignKey: 'id_usuario' });
  Mensalidade.belongsTo(Usuario, { foreignKey: 'id_usuario' });

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Relacionamentos entre Models', () => {
  it('Usuário deve ter várias playlists', async () => {
    const usuario = await Usuario.create({ nome: 'João', login: 'joao@email.com' });
    await Playlist.create({ id_usuario: usuario.id, nome: 'Favoritas' });
    await Playlist.create({ id_usuario: usuario.id, nome: 'Para assistir' });

    const userWithPlaylists = await Usuario.findByPk(usuario.id, {
      include: Playlist,
    });

    expect(userWithPlaylists.Playlists).to.have.lengthOf(2);
    expect(userWithPlaylists.Playlists.map(p => p.nome)).to.include.members(['Favoritas', 'Para assistir']);
  });

  it('Usuário deve ter vários comentários', async () => {
    const usuario = await Usuario.create({ nome: 'Maria', login: 'maria@email.com' });
    const filme = await Filme.create({ titulo: 'Filme X', genero: 'Ação', duracao: 120, ano_lancamento: 2021 });

    await Comentario.create({ id_usuario: usuario.id, id_filme: filme.id, texto: 'Excelente filme!', avaliacao: 9.0 });
    await Comentario.create({ id_usuario: usuario.id, id_filme: filme.id, texto: 'Gostei muito!', avaliacao: 8.5 });

    const userWithComments = await Usuario.findByPk(usuario.id, {
      include: Comentario,
    });

    expect(userWithComments.Comentarios).to.have.lengthOf(2);
  });

  it('Playlist deve ter vários filmes via PlaylistFilme', async () => {
    const usuario = await Usuario.create({ nome: 'Carlos', login: 'carlos@email.com' });
    const playlist = await Playlist.create({ id_usuario: usuario.id, nome: 'Top Filmes' });

    const filme1 = await Filme.create({ titulo: 'Filme A', genero: 'Drama', duracao: 100, ano_lancamento: 2020 });
    const filme2 = await Filme.create({ titulo: 'Filme B', genero: 'Comédia', duracao: 90, ano_lancamento: 2019 });

    await PlaylistFilme.create({ id_playlist: playlist.id, id_filme: filme1.id });
    await PlaylistFilme.create({ id_playlist: playlist.id, id_filme: filme2.id });

    const playlistWithFilmes = await Playlist.findByPk(playlist.id, {
      include: { model: Filme, as: 'filmes' },
    });

    expect(playlistWithFilmes.filmes).to.have.lengthOf(2);
    expect(playlistWithFilmes.filmes.map(f => f.titulo)).to.include.members(['Filme A', 'Filme B']);
  });

  it('Filme deve pertencer a vários canais via CanalFilme', async () => {
    const canal1 = await Canal.create({ nome: 'Canal 1', data_criacao: new Date(), genero_tema: 'Drama' });
    const canal2 = await Canal.create({ nome: 'Canal 2', data_criacao: new Date(), genero_tema: 'Comédia' });
    const filme = await Filme.create({ titulo: 'Filme Y', genero: 'Suspense', duracao: 110, ano_lancamento: 2022 });

    await CanalFilme.create({ id_canal: canal1.id, id_filme: filme.id });
    await CanalFilme.create({ id_canal: canal2.id, id_filme: filme.id });

    const filmeWithCanais = await Filme.findByPk(filme.id, {
      include: Canal,
    });

    expect(filmeWithCanais.Canals || filmeWithCanais.Canais).to.exist;
    expect((filmeWithCanais.Canals || filmeWithCanais.Canais).length).to.equal(2);
  });
});