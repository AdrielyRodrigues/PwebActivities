const { DataTypes } = require('sequelize');


const Canal = (sequelize) => {
  return sequelize.define('Canal', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    data_criacao: { type: DataTypes.DATE, allowNull: false },
    genero_tema: { type: DataTypes.STRING(50), allowNull: false },
  }, {
    tableName: 'canais',
    timestamps: false,
  });
};

module.exports = Canal;
