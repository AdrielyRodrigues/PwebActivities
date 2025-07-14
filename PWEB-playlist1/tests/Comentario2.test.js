import { Sequelize, DataTypes } from 'sequelize';
import defineComentario from '../models/Comentario.js';

const defineUsuario = (sequelize) =>
  sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
  }, { tableName: 'usuarios', timestamps: false });

const defineFilme = (sequelize) =>
  sequelize.define('Filme', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
  }, { tableName: 'filmes', timestamps: false });

let sequelize;
let Comentario, Usuario, Filme;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
  Usuario = defineUsuario(sequelize);
  Filme = defineFilme(sequelize);
  Comentario = defineComentario(sequelize, DataTypes);

  Usuario.hasMany(Comentario, { foreignKey: 'id_usuario' });
  Filme.hasMany(Comentario, { foreignKey: 'id_filme' });
  Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });
  Comentario.belongsTo(Filme, { foreignKey: 'id_filme' });

  await sequelize.sync({ force: true });

  await Usuario.bulkCreate([
    { nome: 'João' },
    { nome: 'Maria' },
  ]);

  await Filme.bulkCreate([
    { titulo: 'Interestelar' },
    { titulo: 'Oppenheimer' },
  ]);
});

afterAll(async () => {
  await sequelize.close();
});

describe('Teste de integração do modelo Comentario', () => {
  test('Usuário pode comentar em múltiplos filmes', async () => {
    const usuario = await Usuario.findOne({ where: { nome: 'João' } });
    const filmes = await Filme.findAll();

    const comentarios = await Promise.all(filmes.map(filme => Comentario.create({
      id_usuario: usuario.id,
      id_filme: filme.id,
      texto: `Comentando sobre ${filme.titulo}`,
      avaliacao: 7.5,
    })));

    expect(comentarios.length).toBe(2);
    expect(comentarios[0].id_usuario).toBe(usuario.id);
  });

  test('Filme pode receber comentários de vários usuários', async () => {
    const usuarios = await Usuario.findAll();
    const filme = await Filme.findOne({ where: { titulo: 'Interestelar' } });

    for (const usuario of usuarios) {
      await Comentario.create({
        id_usuario: usuario.id,
        id_filme: filme.id,
        texto: `Opinião de ${usuario.nome}`,
        avaliacao: 8.0,
      });
    }

    const comentarios = await Comentario.findAll({
      where: { id_filme: filme.id },
    });

    expect(comentarios.length).toBeGreaterThanOrEqual(2);
  });

  test('Listar comentários de um filme ordenados por data', async () => {
    const filme = await Filme.findOne({ where: { titulo: 'Interestelar' } });

    await Comentario.create({
      id_usuario: 1,
      id_filme: filme.id,
      texto: 'Comentário mais recente',
      data_comentario: new Date('2025-07-09T12:00:00'),
    });

    await Comentario.create({
      id_usuario: 1,
      id_filme: filme.id,
      texto: 'Comentário mais antigo',
      data_comentario: new Date('2025-07-01T08:00:00'),
    });

    const comentariosOrdenados = await Comentario.findAll({
      where: { id_filme: filme.id },
      order: [['data_comentario', 'ASC']],
    });

    expect(comentariosOrdenados[0].texto).toBe('Comentando sobre Interestelar');
    expect(comentariosOrdenados.at(-1).texto).toBe('Comentário mais recente');
  });

  test('Calcular média de avaliações de um filme', async () => {
    const filme = await Filme.findOne({ where: { titulo: 'Interestelar' } });

    const comentarios = await Comentario.findAll({
      where: { id_filme: filme.id },
    });

    const soma = comentarios.reduce((total, c) => total + parseFloat(c.avaliacao || 0), 0);
    const media = soma / comentarios.length;

    expect(media).toBeGreaterThanOrEqual(0);
    expect(media).toBeLessThanOrEqual(10);
  });
});
