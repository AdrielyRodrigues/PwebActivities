// models/Presenca.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Presencas  = sequelize.define('Presencas', {
    presente: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Presencas;
};
