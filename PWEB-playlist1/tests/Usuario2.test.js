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

describe('Model Usuario', () => {
  test('Deve criar um usuário válido', async () => {
    const usuario = await Usuario.create({
      login: 'usuario_teste',
      nome: 'Usuário Teste',
      data_nascimento: '1990-01-01',
      email: 'teste@email.com',
    });

    expect(usuario.id).toBeDefined();
    expect(usuario.login).toBe('usuario_teste');
    expect(usuario.nome).toBe('Usuário Teste');
  });

  test('Falha ao criar sem login', async () => {
    await expect(
      Usuario.create({ nome: 'Sem Login' })
    ).rejects.toThrow();
  });

  test('Falha ao criar login duplicado', async () => {
    await Usuario.create({
      login: 'duplicado',
      nome: 'Usuário 1',
    });

    await expect(
      Usuario.create({
        login: 'duplicado',
        nome: 'Usuário 2',
      })
    ).rejects.toThrow();
  });
});
