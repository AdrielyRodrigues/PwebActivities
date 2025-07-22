import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

import AlunoModel from './models/Aluno.js';
import AulaModel from './models/Aula.js';
import PresencasModel from './models/Presencas.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

// Define os modelos
const Aluno = AlunoModel(sequelize);
const Aula = AulaModel(sequelize);
const Presencas = PresencasModel(sequelize);

// Define os relacionamentos
Aluno.hasMany(Presencas, { foreignKey: 'aluno_id' });
Aula.hasMany(Presencas, { foreignKey: 'aula_id' });
Presencas.belongsTo(Aluno, { foreignKey: 'aluno_id' });
Presencas.belongsTo(Aula, { foreignKey: 'aula_id' });

// Exporta apenas uma vez, sem duplicação
export { sequelize, Aluno, Aula, Presencas };
