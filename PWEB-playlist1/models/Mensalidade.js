import { DataTypes } from 'sequelize';


export default (sequelize) => {
  const Mensalidade = sequelize.define('Mensalidade', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: { args: [0], msg: 'O valor da mensalidade não pode ser negativo.' },
      },
    },
    data_pagamento: { type: DataTypes.DATE, allowNull: true },
    ano_mes: {
      type: DataTypes.STRING(7),
      allowNull: false,
      validate: {
        isValidAnoMes(value) {
          if (!/^[0-9]{4}-(0[1-9]|1[0-2])$/.test(value)) {
            throw new Error('Formato de ano_mes inválido. Use o formato YYYY-MM.');
          }
        },
      },
    },
    status: {
      type: DataTypes.ENUM('pago', 'pendente', 'atrasado'),
      allowNull: false,
      defaultValue: 'pendente',
    },
  }, {
    tableName: 'mensalidades',
    timestamps: false,
  });
  return Mensalidade;
};

import { Mensalidade } from './Mensalidade.js';
export { Mensalidade };
