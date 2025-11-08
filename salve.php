<?php
include 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $nome = $_POST['nome'];
  $cpf = $_POST['cpf'];
  $nascimento = $_POST['nascimento'];
  $idade = $_POST['idade'];
  $email = $_POST['email'];
  $telefone = $_POST['telefone'];
  $endereco = $_POST['endereco'];
  $perfil = $_POST['perfil'];
  $idioma = $_POST['idioma'];
  $nivelIdioma = $_POST['nivelIdioma'];
  $certificacoes = $_POST['certificacoes'];
  $descricaoAdicional = $_POST['descricaoAdicional'];

  $stmt = $conn->prepare("INSERT INTO curriculos 
    (nome, cpf, nascimento, idade, email, telefone, endereco, perfil, idioma, nivel_idioma, certificacoes, descricao_adicional)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

  $stmt->bind_param("ssssssssssss", $nome, $cpf, $nascimento, $idade, $email, $telefone, $endereco, $perfil, $idioma, $nivelIdioma, $certificacoes, $descricaoAdicional);

  if ($stmt->execute()) {
    echo "<h2>Currículo salvo com sucesso!</h2>";
  } else {
    echo "<h2>Erro ao salvar currículo: " . $stmt->error . "</h2>";
  }

  $stmt->close();
  $conn->close();
}
?>
