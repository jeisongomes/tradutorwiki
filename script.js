document.getElementById("traduzir").addEventListener("click", async () => {
  const input = document.getElementById("input").value;

  const resultBox = document.getElementById("output");
  resultBox.value = "Traduzindo...";

  try {
    const response = await fetch("https://orange-leaf-a926.jeisongomes.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const data = await response.json();

    resultBox.value = data.result || "Erro ao interpretar resposta.";
  } catch (error) {
    resultBox.value = "Erro ao conectar ao servidor proxy.";
    console.error(error);
  }
});
