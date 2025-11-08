
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


  let y = 20;
  doc.setFontSize(18);
  doc.setFont("Helvetica", "bold");
  doc.text("Currículo Profissional", 70, y); y += 10;

  const addCampo = (label, valor) => {
    if (valor) {
      doc.setFontSize(12);
      doc.setFont("Helvetica", "bold");
      doc.text(`${label}:`, 10, y);
      doc.setFont("Helvetica", "normal");
      doc.text(valor, 40, y);
      y += 6;
    }
  };

  addCampo("Nome", nome);
  addCampo("CPF", cpf);
  addCampo("Idade", idade);
  addCampo("Email", email);
  addCampo("Telefone", telefone);
  addCampo("Endereço", endereco);

  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Perfil Profissional", 10, y); y += 6;
  doc.setFont("Helvetica", "normal");
  const perfilTexto = doc.splitTextToSize(perfil, 180);
  doc.text(perfilTexto, 10, y);
  y += perfilTexto.length * 6;

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
    const descTexto = doc.splitTextToSize(descricao, 180);
    doc.text(descTexto, 12, y);
    y += descTexto.length * 6;
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
  const certTexto = doc.splitTextToSize(certificacoes, 180);
  doc.text(certTexto, 10, y);
  y += certTexto.length * 6;

  if (descricaoAdicional.trim() !== "") {
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Descrição Adicional", 10, y); y += 6;
    doc.setFont("Helvetica", "normal");
    const descTexto = doc.splitTextToSize(descricaoAdicional, 180);
    doc.text(descTexto, 10, y);
    y += descTexto.length * 6;
  }

  // ✅ Baixar o PDF
  doc.save("curriculo.pdf");

  // ✅ Imprimir o PDF em nova aba
  const blob = doc.output("blob");
  const blobURL = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
  const printWindow = window.open(blobURL, "_blank");
  printWindow.onload = () => printWindow.print();
}

function imprimirCurriculo() {
  gerarCurriculo(); // já inclui salvar e imprimir
}
