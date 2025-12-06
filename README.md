# Tradutor Wiki – Jeison

Este é um aplicativo web criado para traduzir textos em **wikitext (MediaWiki)** do inglês para o **português do Brasil**, preservando **toda a estrutura original**, incluindo:

- templates (`{{Template}}`)
- infoboxes
- referências (`<ref>`)
- tags especiais (`<noinclude>`, `<includeonly>`)
- seções (`== Título ==`)
- links wiki (`[[artigo]]`)
- HTML wiki embutido

A tradução é feita por uma IA através de um **Cloudflare Worker**, que funciona como um *proxy seguro* para a API do modelo Gemini.

---

## 🚀 Funcionalidades

- Caixa para colar wikitext em inglês  
- Tradução fiel mantendo toda a marcação  
- Barra de progresso animada  
- Contador de caracteres em tempo real  
- Limite configurável de caracteres (padrão: `20000`)  
- Botão para limpar campos  
- Interface simples, rápida e responsiva  

---

## 🧠 Como funciona

O app envia o texto para o Worker, que repassa para a API do Gemini usando um prompt especializado:

