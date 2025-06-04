CREATE DATABASE gemeas;
USE gemeas;

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45)
);

CREATE TABLE album (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(45),
anoLancamento INT,
descricao VARCHAR(45)
);

CREATE TABLE curtida (
fkUsuario INT,
fkMusica INT,
dataCurtida DATETIME DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fkUsuarioCurtida FOREIGN KEY (fkUsuario)
	REFERENCES usuario(id),
CONSTRAINT fkMusicaCurtida FOREIGN KEY (fkMusica)
	REFERENCES album(id)
);

CREATE TABLE quiz (
id INT PRIMARY KEY AUTO_INCREMENT,
nomeQuiz VARCHAR(45),
descricao VARCHAR(45),
qtdPerguntas INT,
dificuldade VARCHAR(10),
CONSTRAINT chkDificuldade CHECK (dificuldade IN ('Fácil', 'Difícil'))
);

CREATE TABLE tentativa (
id INT PRIMARY KEY AUTO_INCREMENT,
fkQuiz INT,
fkUsuario INT, 
acertos INT,
dataTentativa DATETIME DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fkQuizTentativa FOREIGN KEY (fkQuiz)
	REFERENCES quiz(id),
CONSTRAINT fkUsuarioTentativa FOREIGN KEY (fkUsuario)
	REFERENCES usuario(id)
);

INSERT INTO quiz (nomeQuiz, descricao, qtdPerguntas, dificuldade) VALUES 
('Quiz Fácil', 'Quiz com perguntas fáceis sobre o MPIF', 5, 'Fácil');

INSERT INTO quiz (nomeQuiz, descricao, qtdPerguntas, dificuldade) VALUES 
('Quiz Difícil', 'Quiz com perguntas difíceis sobre o MPIF', 5, 'Difícil');

SELECT * FROM usuario;

SELECT * FROM tentativa;

INSERT INTO tentativa VALUES ( default, 9, 1, 1, default);

INSERT INTO tentativa VALUES ( default, 1, 1, 3, default);