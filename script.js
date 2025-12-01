async function traduzirWikiTexto(inputText) {
  const apiKey = "AIzaSyCOgiYE7yvR3OHSGGhe7pWYGxHtXFCcRQk";

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
Traduza o texto abaixo **do inglês para o português BR**, mantendo:
- TODA a estrutura wiki
- TODO o markup
- Templates iguais
- Infobox igual
- Nada reescrito
- Apenas traduza o conteúdo textual usando traduções oficiais

Texto a traduzir:
${inputText}
`
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();

  console.log("DEBUG raw:", data);

  if (!data.candidates || !data.candidates[0].content || !data.candidates[0].content.parts) {
    throw new Error("Erro: resposta da API não veio no formato esperado.");
  }

  const texto = data.candidates[0].content.parts[0].text;
  return texto;
}
