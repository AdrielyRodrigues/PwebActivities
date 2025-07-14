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
  it('deve criar uma playlist válida com usuário', async () => {
    const user = await Usuario.create({ login: 'playlistuser', nome: 'Playlist Owner', email: 'p@teste.com' });
    const playlist = await Playlist.create({ nome: 'Minha Playlist', id_usuario: user.id });
    expect(playlist).toBeDefined();
    expect(playlist.nome).toBe('Minha Playlist');
  });
});