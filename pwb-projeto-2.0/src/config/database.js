// database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nome_do_banco', 'postgres', 'suaSenhaAqui', {
  host: 'localhost',
  dialect: 'postgres',
});



export default sequelize;

