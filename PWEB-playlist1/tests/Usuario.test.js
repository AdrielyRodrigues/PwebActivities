import { Sequelize, DataTypes } from 'sequelize';
import defineUsuario from '../models/Usuario.js';

let sequelize;
let Usuario;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
  Usuario = defineUsuario(sequelize, DataTypes);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Usuario Model', () => {
  it('deve criar um usuário válido', async () => {
    const user = await Usuario.create({
      login: 'teste123',
      nome: 'Usuário Teste',
      data_nascimento: '2000-01-01',
      email: 'teste@email.com'
    });
    expect(user).toBeDefined();
    expect(user.login).toBe('teste123');
  });
});
