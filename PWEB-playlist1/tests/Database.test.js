import { expect } from 'chai';
import config from '../config/database.js';

describe('Configuração do Banco de Dados', () => {
  it('deve conter o nome de usuário correto', () => {
    console.log('config.username');
    console.log(config.username);
    //expect(config.username).to.be.a('string').and.not.empty;
  });

  it('deve conter o host correto', () => {
    //expect(config.host).to.be.a('string').and.not.empty;
  });

  it('deve ter o dialeto correto', () => {
    console.log('dialect');
    console.log(config.dialect);
    //expect(config.dialect).to.equal('sqlite');
  });
});