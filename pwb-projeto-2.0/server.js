import { sequelize, Presencas } from './setup.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ alter: true });
    console.log('✅ Tabelas sincronizadas com sucesso.');

    // Criar presença de exemplo
    const novaPresenca = await Presencas.create({
      presente: true,
      aluno_id: 1, // substitua com um ID válido
      aula_id: 1,  // substitua com um ID válido
    });
    console.log('✅ Nova presença criada:', novaPresenca.toJSON());

    // Listar presenças
    const todasPresencas = await Presencas.findAll();
    console.log(`Total de presenças: ${todasPresencas.length}`);
  } catch (error) {
    console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', error);
  } finally {
    await sequelize.close();
  }
})();
