const btn = document.getElementById("traduzir");
const input = document.getElementById("input");
const output = document.getElementById("output");

btn.onclick = async () => {
    const texto = input.value.trim();
    if (!texto) {
        output.value = "Cole um texto primeiro!";
        return;
    }

    output.value = "Traduzindo... aguarde...";

    const prompt = `
Você é um tradutor especializado em MediaWiki.
Sua tarefa é traduzir APENAS o conteúdo textual do wikitext abaixo para português do Brasil,
PRESERVANDO 100% da estrutura, marcação, templates, infobox, referências, links, categorias,
seções e formatação. Use traduções oficiais para palavras importantes, lugares e nomes.

NUNCA altere nomes de templates, parâmetros, chaves, pipes, citações, símbolos ou sintaxe da linguagem wiki.
NUNCA traduza nada dentro de:
- {{templates}}
- [[Category:...]]
- [[File:...]]
- <ref>...</ref>

Traduza SOMENTE o texto visível ao leitor.

Texto original:
"""
${texto}
"""

Responda SOMENTE com o wikitext traduzido, sem comentários.
`;

    try {
        const resposta = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyA5OZpuLo5HkeMsgjRLtq93A8RoymQe9EY",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: prompt }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await resposta.json();

        // A resposta do Gemini vem em:
        // data.candidates[0].content.parts[0].text
        const respostaTexto =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Erro: resposta da API não veio como esperado.";

        output.value = respostaTexto;
    } catch (err) {
        output.value = "Erro: " + err.message;
    }
};
