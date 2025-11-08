function previewFoto() {
  const file = document.getElementById("foto").files[0];
  const preview = document.getElementById("preview");
  const reader = new FileReader();
  reader.onloadend = () => preview.src = reader.result;
  if (file) reader.readAsDataURL(file);
}

function calcularIdade() {
  const nascimento = document.getElementById("nascimento").value;
  const idadeInput = document.getElementById("idade");
  if (nascimento) {
    const hoje = new Date();
    const nasc = new Date(nascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
      idade--;
    }
    idadeInput.value = idade;
  }
}

function adicionarExperiencia() {
  const container = document.getElementById("experiencias");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Cargo">
    <input type="text" placeholder="Empresa">
    <input type="text" placeholder="Período">
    <textarea placeholder="Descrição" rows="3"></textarea>
    <button type="button" onclick="this.parentElement.remove()">Remover</button>
  `;
  container.appendChild(div);
}

function adicionarFormacao() {
  const container = document.getElementById("formacoes");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Curso">
    <input type="text" placeholder="Instituição">
    <input type="text" placeholder="Ano de conclusão">
    <button type="button" onclick="this.parentElement.remove()">Remover</button>
  `;
  container.appendChild(div);
}

function resetarExperiencias() {
  if (confirm("Deseja realmente remover todas as experiências adicionadas?")) {
    document.getElementById("experiencias").innerHTML = "";
  }
}

function resetarFormacoes() {
  if (confirm("Deseja realmente remover todas as formações adicionadas?")) {
    document.getElementById("formacoes").innerHTML = "";
  }
}

function gerarCurriculo() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const idade = document.getElementById("idade").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;
  const perfil = document.getElementById("perfil").value;
  const idioma = document.getElementById("idioma").value;
  const nivelIdioma = document.getElementById("nivelIdioma").value;
  const certificacoes = document.getElementById("certificacoes").value;
  const descricaoAdicional = document.getElementById("descricaoAdicional").value;
  const linkedin = document.getElementById("linkedin").value;
  const github = document.getElementById("github").value;

  let y = 20;
  doc.setFontSize(18);
  doc.setFont("Helvetica", "bold");
  doc.text("Currículo", 70, y); y += 10;

  doc.setFontSize(12);

  doc.setFont("Helvetica", "bold");
  doc.text("Nome:", 10, y);
  doc.setFont("Helvetica", "normal");
  doc.text(nome, 40, y); y += 6;

  doc.setFont("Helvetica", "bold");
  doc.text("CPF:", 10, y);
  doc.setFont("Helvetica", "normal");
  doc.text(cpf, 40, y); y += 6;

  doc.setFont("Helvetica", "bold");
  doc.text("Idade:", 10, y);
  doc.setFont("Helvetica", "normal");
  doc.text(idade, 40, y); y += 6;

  doc.setFont("Helvetica", "bold");
  doc.text("Email:", 10, y);
  doc.setFont("Helvetica", "normal");
  doc.text(email, 40, y); y += 6;

  doc.setFont("Helvetica", "bold");
  doc.text("Telefone:", 10, y);
  doc.setFont("Helvetica", "normal");
  doc.text(telefone, 40, y); y += 6;

  doc.setFont("Helvetica", "bold");
  doc.text("Endereço:", 10, y);
  doc.setFont("Helvetica", "normal");
  doc.text(endereco, 40, y); y += 6;

  if (linkedin) {
    doc.setFont("Helvetica", "bold");
    doc.text("LinkedIn:", 10, y);
    doc.setFont("Helvetica", "normal");
    doc.text(linkedin, 40, y); y += 6;
  }

  if (github) {
    doc.setFont("Helvetica", "bold");
    doc.text("GitHub:", 10, y);
    doc.setFont("Helvetica", "normal");
    doc.text(github, 40, y); y += 10;
  }

  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Perfil Profissional", 10, y); y += 6;
  doc.setFontSize(12);
  doc.setFont("Helvetica", "normal");
  doc.text(doc.splitTextToSize(perfil, 180), 10, y); y += doc.getTextDimensions(perfil).h + 5;

  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Experiência Profissional", 10, y); y += 6;
  const expDivs = document.getElementById("experiencias").children;
  for (let div of expDivs) {
    const inputs = div.querySelectorAll("input, textarea");
    const cargo = inputs[0].value;
    const empresa = inputs[1].value;
    const periodo = inputs[2].value;
    const descricao = inputs[3].value;

    doc.setFont("Helvetica", "bold");
    doc.text(`• ${cargo} - ${empresa} (${periodo})`, 10, y); y += 6;
    doc.setFont("Helvetica", "normal");
    doc.text(doc.splitTextToSize(descricao, 180), 12, y);
    y += doc.getTextDimensions(descricao).h + 4;
  }

  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Formação Acadêmica", 10, y); y += 6;
  const formDivs = document.getElementById("formacoes").children;
  for (let div of formDivs) {
    const inputs = div.querySelectorAll("input");
    const curso = inputs[0].value;
    const instituicao = inputs[1].value;
    const ano = inputs[2].value;

    doc.setFont("Helvetica", "bold");
    doc.text(`• ${curso} - ${instituicao} (${ano})`, 10, y); y += 6;
  }

  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Idiomas", 10, y); y += 6;
  doc.setFont("Helvetica", "normal");
  doc.text(`• ${idioma} (${nivelIdioma})`, 10, y); y += 6;

  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Certificações", 10, y); y += 6;
  doc.setFont("Helvetica", "normal");
  doc.text(doc.splitTextToSize(certificacoes, 180), 10, y);
  y += doc.getTextDimensions(certificacoes).h + 5;

  if (descricaoAdicional.trim() !== "") {
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Descrição Adicional", 10, y); y += 6;
    doc.setFont("Helvetica", "normal");
    doc.text(doc.splitTextToSize(descricaoAdicional, 180), 10, y);
    y += doc.getTextDimensions(descricaoAdicional).h + 5;
  }

  const blobURL = doc.output("bloburl");
  const printWindow = window.open(blobURL, "_blank");
  printWindow.onload = () => printWindow.print();
}
