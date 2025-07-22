const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  }
);

// Importar modelos
const { Musica } = require('./Musica');
const { Playlist } = require('./Playlist');
const { PlaylistMusica } = require('./PlaylistMusica');
const { Usuario } = require('./Usuario');
const { Avaliacao } = require('./Avaliacao');
const Canal = require('./Canal');

// Criar modelo Canal
const canal = Canal(sequelize);

// Relacionamentos
Usuario.hasMany(Avaliacao, { foreignKey: 'usuarioId' });
Musica.hasMany(Avaliacao, { foreignKey: 'musicaId' });
Avaliacao.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Avaliacao.belongsTo(Musica, { foreignKey: 'musicaId' });


Playlist.belongsToMany(Musica, {
  through: PlaylistMusica,
  foreignKey: 'playlistId',
  as: 'musicas',
});

Musica.belongsToMany(Playlist, {
  through: PlaylistMusica,
  foreignKey: 'musicaId',
  as: 'playlists',
});

module.exports = {
  sequelize,
  Musica,
  Playlist,
  PlaylistMusica,
  Usuario,
  Avaliacao,
  Canal: canal,
};
