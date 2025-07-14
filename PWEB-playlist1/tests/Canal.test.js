import { sequelize } from '../config/database.js';
import CanalModel from '../models/Canal.js';

const Canal = CanalModel(sequelize);

describe('Canal Model', () => {
  afterAll(async () => {
    await sequelize.close();
  });

  it('deve criar um canal válido', async () => {
    const canal = await Canal.create({
      nome: 'Canal Teste',
      data_criacao: new Date(),
      genero_tema: 'Aventura'
    });

    expect(canal).toBeDefined();
    expect(canal.nome).toBe('Canal Teste');
  });
});