// === Funções da barra de progresso ===
function startProgress() {
  const bar = document.getElementById("progressBar");
  bar.style.width = "0%";

  // animação contínua até a resposta chegar
  let width = 0;
  bar._interval = setInterval(() => {
    width += 2;
    if (width >= 90) width = 90; // nunca completar antes
    bar.style.width = width + "%";
  }, 120);
}

function finishProgress() {
  const bar = document.getElementById("progressBar");
  clearInterval(bar._interval);
  bar.style.width = "100%";

  setTimeout(() => {
    bar.style.width = "0%";
  }, 600);
}

function resetProgress() {
  const bar = document.getElementById("progressBar");
  clearInterval(bar._interval);
  bar.style.width = "0%";
}

// === BOTÃO DE TRADUZIR ===
document.getElementById("translateBtn").addEventListener("click", async () => {
  const input = document.getElementById("inputText").value.trim();
  const output = document.getElementById("outputText");

  if (!input) {
    output.value = "Cole um texto para traduzir.";
    return;
  }

  output.value = "Traduzindo...";

  try {
    const response = await fetch("https://tradutorwiki.jeisongomes.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:
          `Você é um tradutor especializado em MediaWiki. Sua tarefa é traduzir APENAS o conteúdo textual do wikitext abaixo para português do Brasil, utilizando uma tradução oficial e terminologia padrão. NUNCA altere a estrutura, a ordem das seções ou a disposição do conteúdo. Mantenha TODAS as marcações wiki, templates, infoboxes, tags <ref>, <includeonly>, <noinclude> e códigos HTML wiki. Não traduza o NOME da chamada de templates/modelos ({{Nome do Template}}), apenas o conteúdo interno. Títulos de Seção (==Título==, ===Subtítulo===) e links ([[texto]]) devem ser traduzidos para a versão oficial.\n\nTexto:\n${input}`
      }),
    });

    const data = await response.json();

    if (!data.text) {
      output.value =
        "Erro: resposta inesperada da API.\n\n" + JSON.stringify(data, null, 2);
      return;
    }

    output.value = data.text;
  } catch (err) {
    output.value = "Erro ao conectar ao Worker: " + err.message;
  }
});

// NOVO: BOTÃO DE LIMPAR
document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").value = "";
});
