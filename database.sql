-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS curriculo;
USE curriculo;

-- Criação da tabela curriculos
CREATE TABLE IF NOT EXISTS curriculos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(20) NOT NULL,
  nascimento DATE NOT NULL,
  idade INT NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(50) NOT NULL,
  endereco TEXT NOT NULL,
  perfil TEXT,
  idioma VARCHAR(100),
  nivel_idioma VARCHAR(50),
  certificacoes TEXT,
  descricao_adicional TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
