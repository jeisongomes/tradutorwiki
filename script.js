// --- ELEMENTOS ---
const inputEl = document.getElementById("inputText");
const outputEl = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const clearBtn = document.getElementById("clearBtn"); // novo botão
const progressBar = document.getElementById("progressBar"); // barra
const charCount = document.getElementById("charCount"); // contador

// ===== CONFIGURAÇÃO DO LIMITE =====
const MAX_CHARS = 20000; // << ajuste aqui o limite desejado

// Atualiza contador e impede ultrapassar o limite
const inputBox = document.getElementById("inputText");
const counter = document.getElementById("charCounter"); // precisa ter esse span no HTML

inputBox.addEventListener("input", () => {
  if (inputBox.value.length > MAX_CHARS) {
    inputBox.value = inputBox.value.slice(0, MAX_CHARS);
  }
  counter.textContent = `${inputBox.value.length}/${MAX_CHARS}`;
});

  // cor indicando limite atingido
  counter.style.color = 
    inputBox.value.length >= MAX_CHARS ? "red" : "#333";
});

// --- CONTADOR DE CARACTERES ---
inputEl.addEventListener("input", () => {
  charCount.textContent = `Caracteres: ${inputEl.value.length}`;
});

// --- BOTÃO LIMPAR ---
clearBtn.addEventListener("click", () => {
  inputEl.value = "";
  outputEl.value = "";
  charCount.textContent = "Caracteres: 0";
  progressBar.style.width = "0%";
});

// --- FUNÇÃO DE TRADUÇÃO ---
translateBtn.addEventListener("click", async () => {
  const input = inputEl.value.trim();

  if (!input) {
    outputEl.value = "Cole um texto para traduzir.";
    return;
  }

  outputEl.value = "Traduzindo...";
  progressBar.style.width = "20%"; // início

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

    progressBar.style.width = "50%"; // requisição enviada

    const data = await response.json();

    progressBar.style.width = "80%"; // quase lá

    if (!data.text) {
      outputEl.value =
        "Erro: resposta inesperada da API.\n\n" + JSON.stringify(data, null, 2);
      progressBar.style.width = "0%";
      return;
    }

    outputEl.value = data.text;
    progressBar.style.width = "100%"; // concluído

    setTimeout(() => {
      progressBar.style.width = "0%";
    }, 700);

  } catch (err) {
    outputEl.value = "Erro ao conectar ao Worker: " + err.message;
    progressBar.style.width = "0%";
  }
});
