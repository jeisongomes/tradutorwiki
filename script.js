// ATENÇÃO: substitua YOUR_GEMINI_API_KEY pela chave real.
// Preferível: não deixar chave hard-coded em produção. Use backend para proteger a chave.

const btn = document.getElementById('traduzir');
const input = document.getElementById('input');
const output = document.getElementById('output');
const logEl = document.getElementById('log');

btn.addEventListener('click', async () => {
  const texto = input.value.trim();
  if (!texto) {
    output.value = 'Cole um texto primeiro!';
    return;
  }

  output.value = 'Traduzindo...';
  logEl.textContent = '';

  const prompt = `
Você é um tradutor especializado em MediaWiki.
Sua tarefa é traduzir APENAS o conteúdo textual do wikitext abaixo para português do Brasil, utilizando uma tradução oficial e terminologia padrão. 
NUNCA altere a estrutura, a ordem das seções ou a disposição do conteúdo. Mantenha TODAS as marcações wiki, templates, infoboxes, tags <ref>, <includeonly>, 
<noinclude> e códigos HTML wiki.
Não traduza o NOME da chamada de templates/modelos ({{Nome do Template}}), apenas o conteúdo interno.
Títulos de Seção (==Título==, ===Subtítulo===) devem ser traduzidos para a versão oficial.

Texto original:
"""
${texto}
"""

Responda SOMENTE com o wikitext traduzido, sem comentários.
`;

  try {
    // Endpoint REST recomendado: usar o endpoint de Generative Language / Vertex AI.
    // Aqui usamos a rota "models/{model}:generate" — ajuste se teu ambiente exigir v1/v1beta2 ou outro regional endpoint.
    const MODEL = 'gemini-2.5-flash';
    const API_KEY = 'AIzaSyCOgiYE7yvR3OHSGGhe7pWYGxHtXFCcRQk';

    // Possíveis endpoints (se um falhar, verifica na doc/região):
    // 1) https://generativelanguage.googleapis.com/v1beta2/models/{model}:generate
    // 2) https://generativelanguage.googleapis.com/v1/models/{model}:generate
    // Use a que sua conta/region pedir. Vamos usar v1beta2 como padrão moderno:
    const endpoint = `https://generativelanguage.googleapis.com/v1beta2/models/${MODEL}:generate`;

    const body = {
      // estrutura simples com "text input"
      prompt: {
        // "text" input variant
        text: { content: prompt }
      },
      // options: controle de tokens, temperatura etc.
      temperature: 0.1,
      maxOutputTokens: 2500
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // cabeçalho recomendado para API key
        'x-goog-api-key': API_KEY
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    // Log completo (útil pra diagnosticar formatos diferentes)
    logEl.textContent = JSON.stringify(data, null, 2);

    // Tentativa de extrair texto com múltiplos fallback paths (várias versões da API usam campos distintos)
    let candidateText = null;

    // Possíveis locais onde o texto pode aparecer:
    // 1) data.candidates[0].content[0].text  (usado antigamente)
    // 2) data.candidates[0].content.parts[0].text
    // 3) data.output?.[0]?.content?.[0]?.text
    // 4) data.result?.output?.[0]?.content?.[0]?.text
    // 5) data.text (bibliotecas higher-level retornam .text)
    // 6) data.candidates[0].content?.[0]?.text
    try {
      candidateText =
        data?.candidates?.[0]?.content?.[0]?.text ||
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.output?.[0]?.content?.[0]?.text ||
        data?.result?.output?.[0]?.content?.[0]?.text ||
        data?.text ||
        (Array.isArray(data?.candidates) && typeof data.candidates[0] === 'string' ? data.candidates[0] : null);
    } catch (e) {
      candidateText = null;
    }

    if (!candidateText) {
      // Se não conseguiu extrair automaticamente, mostra mensagem útil e mantém o log para inspeção.
      output.value = 'Erro: resposta da API não veio no formato esperado. Veja logs abaixo para diagnosticar.';
      return;
    }

    output.value = candidateText;
  } catch (err) {
    output.value = 'Erro: ' + (err.message || String(err));
    logEl.textContent = err.stack || JSON.stringify(err, null, 2);
  }
});
