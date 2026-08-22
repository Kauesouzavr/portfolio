# Portfólio — Kauê Souza

## Estrutura

```
kaue-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── foto-kaue.jpg
    └── computer-animation.json
```

## ⚠️ Importante: rode com um servidor local, não abrindo o arquivo direto

A animação do computador (`assets/computer-animation.json`) é carregada via `fetch`
pelo `js/script.js`. Navegadores **bloqueiam isso por segurança** se você só der
duplo-clique no `index.html` (protocolo `file://`) — a animação simplesmente não
vai aparecer, sem erro visível.

Formas simples de rodar localmente:

- **VS Code**: instale a extensão "Live Server" → botão direito no `index.html` →
  "Open with Live Server".
- **Terminal (Python já vem instalado na maioria dos sistemas)**:
  ```bash
  cd kaue-portfolio
  python3 -m http.server 8000
  ```
  depois abra `http://localhost:8000` no navegador.

Uma vez publicado na Vercel, isso deixa de ser problema (Vercel já serve tudo via HTTP).

## Bibliotecas usadas (via CDN, sem precisar de `npm install`)

- **GSAP + ScrollTrigger + SplitText** — animações e o efeito de letras que
  aparecem ao rolar a página
- **lottie-web** — a animação do computador no hero
- **Font Awesome 6** — ícones
- Fontes: **Unbounded** (títulos) + **IBM Plex Sans** (texto), via Google Fonts

## O que falta / pontos pendentes

1. **Botão "Download CV"** (seção Sobre) — está sem link real. Quando tiver o PDF
   do currículo, coloque em `assets/` e aponte o `href` pra ele.
2. **Botão "Ver Projetos"** — ainda não existe uma seção de projetos nessa versão
   (só Hero → Sobre → Destaques). Precisa ser criada.
3. **WhatsApp**: o número usado em versões anteriores (`55249924992114137`) tinha
   dígitos a mais que o padrão brasileiro — não está nesta versão ainda, mas
   confirme o número certo antes de adicionar os botões de contato de volta.
4. **E-mail**: nunca foi informado, então não há botão de e-mail nesta versão.
5. Só existem 3 seções por enquanto: Hero, Sobre, Destaques. Faltam: Stack
   completo, Projetos, Contato, FAQ, além das páginas separadas (404, política de
   privacidade, etc.) que foram feitas numa versão anterior do site
   (`index.html` "oficial", diferente deste `demo.html` de estilo).

## Deploy

Arquivo estático puro — dá pra jogar essa pasta inteira direto na Vercel
(drag-and-drop no dashboard, ou `vercel deploy` pela CLI) sem nenhuma etapa de build.
