-- CRIAÇÃO DAS TABELAS
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    duracao_minutos INT NOT NULL, -- duração em minutos
    ano_lancamento INT NOT NULL,
    nota_media NUMERIC(10, 2) CHECK (nota_media BETWEEN 0 AND 10)
);

CREATE TABLE canais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_criacao DATE NOT NULL,
    genero_tema VARCHAR(50) NOT NULL
);

CREATE TABLE canal_filmes (
    id SERIAL PRIMARY KEY,
    canal_id INT REFERENCES canais(id) ON DELETE CASCADE,
    filme_id INT REFERENCES filmes(id) ON DELETE CASCADE,
    data_recomendacao DATE DEFAULT CURRENT_DATE
);

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    nome VARCHAR(200),
    data_criacao DATE DEFAULT CURRENT_DATE
);

CREATE TABLE playlist_filmes (
    id SERIAL PRIMARY KEY,
    playlist_id INT REFERENCES playlists(id) ON DELETE CASCADE,
    canal_id INT REFERENCES canais(id) ON DELETE SET NULL,
    filme_id INT REFERENCES filmes(id) ON DELETE CASCADE,
    assistido BOOLEAN DEFAULT FALSE,
    tempo_assistido_minutos INT DEFAULT 0,
    data_visualizacao DATE,
    nota_usuario INT CHECK (nota_usuario BETWEEN 1 AND 5)
);

CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    filme_id INT REFERENCES filmes(id) ON DELETE CASCADE,
    texto TEXT NOT NULL,
    data_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    avaliacao NUMERIC(10, 2) CHECK (avaliacao BETWEEN 0 AND 10)
);
