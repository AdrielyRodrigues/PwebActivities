// models/PlaylistMusica.js
import { DataTypes } from 'sequelize';
import { sequelize } from './Index.js';


export const PlaylistMusica = sequelize.define('PlaylistMusica', {
  ordem: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});
import { PlaylistMusica } from './PlaylistMusica.js';
export { PlaylistMusica };
