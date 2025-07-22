// models/Playlist.js
import { DataTypes } from 'sequelize';
import { sequelize } from './Index.js';


export const Playlist = sequelize.define('Playlist', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_criacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
import { Playlist } from './Playlist.js';
export { Playlist };
