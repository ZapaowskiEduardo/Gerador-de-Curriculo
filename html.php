<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gerador de Currículo</title>
  <link rel="stylesheet" href="style.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
</head>
<body>
  <div class="container">
    <h1>Gerador de Currículo </h1>
    <form id="curriculoForm">
      <div class="section">
        <h2>Dados Pessoais</h2>
        <input type="text" id="nome" placeholder="Nome completo" required />
        <input type="text" id="cpf" placeholder="CPF" required />
        <input type="date" id="nascimento" onchange="calcularIdade()" required />
        <input type="text" id="idade" placeholder="Idade" readonly />
        <input type="email" id="email" placeholder="Email" required />
        <input type="text" id="telefone" placeholder="Telefone" required />
        <input type="text" id="endereco" placeholder="Endereço" required />
      </div>

      <div class="section">
        <h2>Perfil Profissional</h2>
        <textarea id="perfil" placeholder="Resumo profissional" rows="4"></textarea>
      </div>

      <div class="section">
        <h2>Experiência Profissional</h2>
        <div id="experiencias"></div>
        <div class="button-group">
          <button type="button" onclick="adicionarExperiencia()">Adicionar Experiência</button>
        </div>
      </div>

      <div class="section">
        <h2>Formação Acadêmica</h2>
        <div id="formacoes"></div>
        <div class="button-group">
          <button type="button" onclick="adicionarFormacao()">Adicionar Formação</button>
        </div>
      </div>

      <div class="section">
        <h2>Idiomas</h2>
        <input type="text" id="idioma" placeholder="Idioma" />
        <select id="nivelIdioma">
          <option value="Básico">Básico</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
          <option value="Fluente">Fluente</option>
        </select>
      </div>

      <div class="section">
        <h2>Certificações</h2>
        <textarea id="certificacoes" placeholder="Ex: Excel Avançado, Google Analytics..." rows="3"></textarea>
      </div>

      <div class="section">
        <h2>Descrição Adicional</h2>
        <textarea id="descricaoAdicional" placeholder="Informações extras ou observações" rows="4"></textarea>
      </div>

      <div class="buttons">
        <button type="button" onclick="gerarCurriculo()">Baixar Currículo em PDF</button>
        <button type="reset">Limpar Tudo</button>
      </div>
    </form>
  </div>
  <script src="script.js"></script>
</body>
</html>
