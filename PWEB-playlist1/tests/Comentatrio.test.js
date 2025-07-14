import { Sequelize, DataTypes } from 'sequelize';
import ComentarioModel from '../models/Comentario.js';
import defineUsuario from '../models/Usuario.js';
import defineFilme from '../models/Filme.js';

let sequelize;
let Comentario, Usuario, Filme;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  Usuario = defineUsuario(sequelize, DataTypes);
  Filme = defineFilme(sequelize, DataTypes);
  Comentario = ComentarioModel(sequelize, DataTypes);

  Usuario.hasMany(Comentario, { foreignKey: 'id_usuario' });
  Filme.hasMany(Comentario, { foreignKey: 'id_filme' });
  Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });
  Comentario.belongsTo(Filme, { foreignKey: 'id_filme' });

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Comentario Model', () => {
  it('deve criar um comentário válido', async () => {
    const user = await Usuario.create({ login: 'comentuser', nome: 'Comentador', email: 'coment@teste.com' });
    const filme = await Filme.create({ titulo: 'Interestelar', genero: 'Sci-Fi', duracao: 169, ano_lancamento: 2014 });
    const comentario = await Comentario.create({
      id_usuario: user.id,
      id_filme: filme.id,
      texto: 'Otimo filme!',
      data_comentario: new Date(),
      avaliacao: 9.5
    });
    expect(comentario).toBeDefined();
    expect(comentario.texto).toMatch(/Otimo filme/);
  });
});