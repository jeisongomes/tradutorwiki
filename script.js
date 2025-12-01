const WORKER_URL = "https://orange-leaf-a926.jeisongomes.workers.dev";

async function traduzir(texto) {
  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: texto }),
  });

  const data = await response.json();
  return data.output;
}
