import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Aula = sequelize.define('Aula', {
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Aula;
};
