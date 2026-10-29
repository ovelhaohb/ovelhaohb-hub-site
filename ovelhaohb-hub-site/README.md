# Site oficial — OvelhaoHB Hub Idle

Site estático em HTML, CSS e JavaScript, pronto para publicação no GitHub Pages.

## O que está incluído

- Página inicial responsiva com visual gamer escuro e neon.
- Cards de Windows, macOS e Linux.
- Consulta automática da API pública do GitHub para ler os assets da Release mais recente.
- Links para os arquivos publicados, sem inventar nomes ou URLs de instaladores.
- Tutoriais separados para Windows, macOS e Linux.
- Links para repositório, Releases e Issues.

## Como publicar

1. Crie um repositório separado, por exemplo `ovelhaohb-hub-site`.
2. Envie todos os arquivos e pastas deste pacote para a raiz do repositório.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/(root)` e salve.
6. Aguarde a publicação e abra o endereço exibido na página Settings → Pages.

Documentação oficial: https://docs.github.com/en/pages/quickstart

## Como funcionam os downloads

O arquivo `assets/site.js` consulta:

`https://api.github.com/repos/ovelhaohb/ovelhaohb-hub-idle/releases`

Ele escolhe a Release pública estável mais recente (ou a primeira pública disponível) e filtra seus arquivos por padrões de nome/extensão para Windows, macOS e Linux. Se não encontrar um asset compatível ou a API falhar, o site mostra o link da página oficial de Releases.

**Importante:** para que a detecção funcione bem, publique os instaladores como assets de uma Release pública e use nomes claros, por exemplo contendo `Windows`, `macOS` ou `Linux` e a extensão correta. A lista automática é uma heurística; revise o site após publicar cada versão. A página “Todas as Releases” permanece disponível como alternativa.

## Estrutura

```text
ovelhaohb-hub-site/
├── index.html
├── README.md
├── assets/
│   ├── favicon.svg
│   ├── site.js
│   └── style.css
└── tutoriais/
    ├── windows.html
    ├── macos.html
    └── linux.html
```

## Observações

- O site não hospeda nem cria os instaladores; os arquivos continuam no GitHub Releases do projeto do aplicativo.
- Não é necessário adicionar tokens, senhas ou chaves de API ao site.
- Os tutoriais foram escritos de forma conservadora porque o formato exato e os requisitos dos instaladores não foram verificados neste pacote. Atualize-os se o projeto tiver passos específicos.
- GitHub Pages publica o conteúdo do site publicamente. Não coloque segredos ou arquivos privados neste repositório.
