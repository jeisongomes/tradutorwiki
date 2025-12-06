# Tradutor Wiki — Jeison

Este projeto é um tradutor especializado para **MediaWiki/Wikitext**, ideal para traduzir artigos, templates e páginas da comunidade sem quebrar a estrutura.  
Ele utiliza um **Cloudflare Worker como proxy seguro**, permitindo chamadas à API do Gemini sem expor a chave no frontend.

---

## 🚀 Funcionalidades

- Tradução fiel de wikitext **sem alterar estrutura, templates, infoboxes ou referências**  
- Preserva:  
  - `== Seções ==`  
  - `{{Templates}}`  
  - `[[Links internos]]`  
  - `<ref>` tags  
  - HTML wiki  
- Limite configurável de caracteres (padrão: **20.000**)  
- Contador de caracteres automático  
- Barra de progresso  
- Botão para limpar entrada e saída  
- Interface simples em HTML + CSS + JS  
- Backend usando **Cloudflare Workers** (gratuito)

---

## 🛠️ Tecnologias Utilizadas

- **HTML/CSS/JavaScript** — Frontend  
- **Cloudflare Workers** — Proxy seguro para API  
- **Google Gemini 2.5 Flash / Pro** — Tradução  
- **Fetch API** — Comunicação com o Worker  

---

## 📦 Estrutura do Projeto

/
├── index.html
├── style.css
├── script.js
└── worker.js (deploy no Cloudflare)

---

## ⚙️ Configuração

### 1. Configure o Cloudflare Worker

No painel do Cloudflare:

1. Crie um novo Worker  
2. Cole o conteúdo de `worker.js`  
3. Adicione uma variável de ambiente:  
   - **GEMINI_API_KEY = "sua_chave_aqui"**
4. Faça o deploy  
5. Copie a URL (ex: `https://tradutorwiki.seudominio.workers.dev`)

---

