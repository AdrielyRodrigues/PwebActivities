import { expect } from 'chai';
import { sequelize, Aula } from '../setup.js';

describe('Aula Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('deve criar uma aula com data e descrição', async () => {
    const aula = await Aula.create({
      data: '2025-07-22',
      descricao: 'Aula de Geografia',
    });

    expect(aula).to.have.property('id');
    expect(aula.data).to.equal('2025-07-22');
    expect(aula.descricao).to.equal('Aula de Geografia');
  });
});
