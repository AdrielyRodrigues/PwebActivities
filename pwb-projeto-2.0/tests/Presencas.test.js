import { expect } from 'chai';
import { sequelize, Aluno, Aula, Presencas } from '../setup.js';

describe('Presenca Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('deve registrar presença para um aluno em uma aula', async () => {
    const aluno = await Aluno.create({
      nome: 'João Silva',
      matricula: 'B67890',
    });

    const aula = await Aula.create({
      data: '2025-07-22',
      descricao: 'Aula de Matemática',
    });

    const presenca = await Presencas.create({
      presente: true,
      aluno_id: aluno.id,
      aula_id: aula.id,
    });

    expect(presenca).to.have.property('id');
    expect(presenca.presente).to.be.true;
    expect(presenca.aluno_id).to.equal(aluno.id);
    expect(presenca.aula_id).to.equal(aula.id);
  });
});
