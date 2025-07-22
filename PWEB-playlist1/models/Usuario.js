import { DataTypes } from 'sequelize';
import { sequelize } from './Index.js';


export const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  login: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
  },
  email: {
    type: DataTypes.STRING(100),
  },
}, {
  tableName: 'usuarios',
  timestamps: true,
});
import { Usuario } from './Usuario.js';
export { Usuario};
