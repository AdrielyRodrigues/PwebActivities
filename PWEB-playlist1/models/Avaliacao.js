const { DataTypes } = require('sequelize');
const { sequelize } = require('./Index');
const { expect } = require('chai');


const Avaliacao = sequelize.define('Avaliacao', {
  texto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  avaliacao: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 10,
    },
  },
  data_comentario: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = { Avaliacao };

