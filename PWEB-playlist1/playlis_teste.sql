CREATE TABLE perfis (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    nome_completo VARCHAR(100) NOT NULL
);

CREATE TABLE midias (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    duracao_minutos INT NOT NULL,
    ano INT NOT NULL,
    avaliacao_geral NUMERIC(10, 2) CHECK (avaliacao_geral BETWEEN 0 AND 10)
);

CREATE TABLE canais_streaming (
    id SERIAL PRIMARY KEY,
    nome_canal VARCHAR(100) NOT NULL,
    criado_em DATE NOT NULL,
    tema_principal VARCHAR(50) NOT NULL
);

CREATE TABLE exibicoes (
    id SERIAL PRIMARY KEY,
    canal_id INT REFERENCES canais_streaming(id) ON DELETE CASCADE,
    midia_id INT REFERENCES midias(id) ON DELETE CASCADE,
    data_exibicao DATE DEFAULT NOW()
);

CREATE TABLE colecoes (
    id SERIAL PRIMARY KEY,
    perfil_id INT REFERENCES perfis(id) ON DELETE CASCADE,
    titulo VARCHAR(200),
    criado_em DATE
);

CREATE TABLE colecao_midias (
    id SERIAL PRIMARY KEY,
    colecao_id INT REFERENCES colecoes ON DELETE NO ACTION,
    canal_id INT REFERENCES canais_streaming(id) ON DELETE NO ACTION,
    midia_id INT REFERENCES midias(id) ON DELETE CASCADE,
    assistido BOOLEAN DEFAULT FALSE,
    tempo_visto INT DEFAULT 0,
    data_visualizacao DATE,
    nota_usuario INT CHECK (nota_usuario BETWEEN 1 AND 5)
);

CREATE TABLE opinioes (
    id SERIAL PRIMARY KEY,
    perfil_id INT REFERENCES perfis(id) ON DELETE CASCADE,
    midia_id INT REFERENCES midias(id) ON DELETE CASCADE,
    comentario TEXT NOT NULL,
    data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nota NUMERIC(10, 2) CHECK (nota BETWEEN 0 AND 10)
);

-- INSERTS EM Mídias
INSERT INTO midias (titulo, categoria, duracao_minutos, ano, avaliacao_geral) VALUES
('O Som da Liberdade', 'Drama', 135, 2023, 8.7),
('Missão Resgate', 'Ação', 121, 2021, 7.5),
('Além da Escuridão', 'Terror', 103, 2022, 6.8),
('Céu de Outubro', 'Ficção Científica', 112, 2020, 7.9),
('Comédia no Espaço', 'Comédia', 95, 2021, 6.5),
('Cidade Invisível', 'Fantasia', 101, 2023, 7.2),
('Caminhos da Vida', 'Drama', 118, 2022, 8.1),
('Planeta Hostil', 'Aventura', 110, 2023, 7.0),
('Revolta Zumbi', 'Terror', 99, 2021, 5.9),
('Alma Animada', 'Animação', 98, 2023, 8.3);

-- INSERTS EM CANAIS
INSERT INTO canais_streaming (nome_canal, criado_em, tema_principal) VALUES
('StreamMaster', '2023-05-01', 'Ação'),
('DramaNow', '2023-05-02', 'Drama'),
('ToonPlus', '2023-05-03', 'Animação'),
('SciFiX', '2023-05-04', 'Ficção Científica'),
('TerrorTube', '2023-05-05', 'Terror');


--INSERTS EM EXIBIÇÕES
INSERT INTO exibicoes (canal_id, midia_id) VALUES
(1, 2), (1, 4), (1, 6),
(2, 1), (2, 7),
(3, 10), (3, 5),
(4, 4), (4, 8),
(5, 3), (5, 9);


--  INSERTS EM PERFIS
INSERT INTO perfis (usuario, nome_completo) VALUES
('aline_ribeiro', 'Aline Ribeiro'),
('daniel_g', 'Daniel Gonçalves'),
('carla123', 'Carla Mendes'),
('ricardo_lima', 'Ricardo Lima'),
('juliana_souza', 'Juliana Souza');

--  INSERTS EM OPINIÕES
INSERT INTO opinioes (perfil_id, midia_id, comentario, nota) VALUES
(1, 1, 'Um filme emocionante e necessário!', 9.0),
(2, 2, 'Ação do começo ao fim, muito bom.', 8.2),
(3, 3, 'Assustador e instigante. Boa produção.', 7.0),
(4, 4, 'Excelente abordagem de ficção científica.', 8.5),
(5, 5, 'Bem leve e divertida.', 6.4),
(1, 6, 'Fantasia com elementos brasileiros, adorei!', 8.1),
(2, 7, 'Drama tocante, recomendo.', 8.7),
(3, 8, 'Paisagens incríveis e aventura sólida.', 7.5),
(4, 9, 'Terror básico, mas funcional.', 6.0),
(5, 10, 'Animação encantadora com mensagem bonita.', 8.8);







