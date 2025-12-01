async function traduzir() {
    const apiKey = "AIzaSyCOgiYE7yvR3OHSGGhe7pWYGxHtXFCcRQk"; 
    const texto = document.getElementById("inputText").value;

    const prompt = `
Você é um tradutor profissional especializado em MediaWiki.

Traduza o texto abaixo **DE INGLÊS PARA PORTUGUÊS**, mantendo:
- mesmíssima estrutura,
- mesmos templates,
- mesmas marcações wiki,
- mesmas predefinições,
- mesmo espaçamento,
- mesmas tags HTML de dentro do wikitext,
- não altere parâmetros,
- não adicione comentários.

APENAS traduza o texto do corpo usando traduções oficiais.

Texto a traduzir:
"""
${texto}
"""
`;

    try {
        const resposta = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            })
        });

        const data = await resposta.json();

        // Debug opcional:
        // console.log("Resposta completa:", data);

        // --- NOVO FORMATO CORRETO DO GEMINI ---
        let output = "";

        if (data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content &&
            data.candidates[0].content[0].text) {

            output = data.candidates[0].content[0].text.trim();

        } else if (data.output_text) {
            output = data.output_text.trim();

        } else {
            throw new Error("Formato inesperado: " + JSON.stringify(data, null, 2));
        }

        document.getElementById("outputText").value = output;

    } catch (erro) {
        document.getElementById("outputText").value =
            "Erro: " + erro.message;
    }
}
