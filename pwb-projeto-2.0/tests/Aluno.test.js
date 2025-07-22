import { expect } from 'chai';
import { sequelize, Aluno } from '../setup.js';

describe('Aluno Model', () => {
  before(async () => {
    await sequelize.sync({ force: true }); // Limpa e recria as tabelas
  });

  it('deve criar um aluno com nome e matrícula', async () => {
    const aluno = await Aluno.create({
      nome: 'Maria Souza',
      matricula: 'A12345',
    });

    expect(aluno).to.have.property('id');
    expect(aluno.nome).to.equal('Maria Souza');
    expect(aluno.matricula).to.equal('A12345');
  });
});
