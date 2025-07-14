import { Sequelize, DataTypes } from 'sequelize';
import defineMensalidade from '../models/Mensalidade.js';
import defineUsuario from '../models/Usuario.js';

let sequelize;
let Mensalidade, Usuario;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  Usuario = defineUsuario(sequelize, DataTypes);
  Mensalidade = defineMensalidade(sequelize, DataTypes);

  Usuario.hasMany(Mensalidade, { foreignKey: 'id_usuario' });
  Mensalidade.belongsTo(Usuario, { foreignKey: 'id_usuario' });

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Mensalidade Model', () => {
  it('deve criar uma mensalidade válida', async () => {
    const user = await Usuario.create({ login: 'pagador', nome: 'Pagador', email: 'pagador@teste.com' });

    const mensalidade = await Mensalidade.create({
      id_usuario: user.id,
      valor: 29.90,
      ano_mes: '2025-07',
      status: 'pago'
    });

    expect(mensalidade).toBeDefined();
    expect(mensalidade.status).toBe('pago');
  });
});
