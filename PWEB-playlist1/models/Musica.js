const { DataTypes } = require('sequelize');
const { sequelize } = require('./Index');



const Musica = sequelize.define('Musica', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artista: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracao_segundos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ano_lancamento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nota_media: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 10,
    },
  },
});

import { Musica } from './Musica.js';
export { Musica };

