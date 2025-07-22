const { sequelize, Usuario } = require('./models/Index');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ alter: true });
    console.log('✅ Tabelas sincronizadas com sucesso.');

    const novoUsuario = await Usuario.create({
      login: 'gabriel4.ribeiro',
      nome: 'Gabriel3 Ribeiro',
    });

    const usuarios = await Usuario.findAll();
    console.log(`Total de usuários: ${usuarios.length}`);
  } catch (error) {
    console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', error);
  } finally {
    await sequelize.close();
  }
})();
