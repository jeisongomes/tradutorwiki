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
          `Traduza o texto seguinte de inglês para português **sem alterar nenhuma marcação wikitext**.\n\nTexto:\n${input}`
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
