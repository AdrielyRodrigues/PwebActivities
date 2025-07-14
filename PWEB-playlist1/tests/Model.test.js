import { Sequelize, DataTypes } from 'sequelize';
import definePlaylist from '../models/Playlist.js';
import defineUsuario from '../models/Usuario.js';

let sequelize;
let Playlist, Usuario;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
  Usuario = defineUsuario(sequelize, DataTypes);
  Playlist = definePlaylist(sequelize, DataTypes);

  Usuario.hasMany(Playlist, { foreignKey: 'id_usuario' });
  Playlist.belongsTo(Usuario, { foreignKey: 'id_usuario' });

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Playlist Model', () => {
  it('deve criar e buscar uma playlist válida com usuário', async () => {
    const user = await Usuario.create({ login: 'playlistuser', nome: 'Playlist Owner', email: 'p@teste.com' });

    const playlistCriada = await Playlist.create({
      id_usuario: user.id,
      nome: 'Minha Playlist de Teste',
    });

    expect(playlistCriada).toBeDefined();
    expect(playlistCriada.nome).toBe('Minha Playlist de Teste');

    const playlistBuscada = await Playlist.findOne({ where: { id: playlistCriada.id } });

    expect(playlistBuscada).toBeDefined();
    expect(playlistBuscada.id_usuario).toBe(user.id);
  });
});