# 🚀 NFT Marketplace - Jungle Gaming Challenge

Marketplace de NFTs desenvolvido para o desafio técnico da Jungle Gaming.

## ️ Tecnologias

- **Frontend:** React 18 + TypeScript + Vite
- **Roteamento:** TanStack Router (File-based routing)
- **Estado e Cache:** TanStack Query + Zustand (com persistência no localStorage)
- **Estilização:** Tailwind CSS + shadcn/ui
- **HTTP Client:** Axios
- **Mocking:** MSW (Mock Service Worker)
- **Tempo Real:** Socket.IO Client
- **Testes:** Playwright (E2E)

## 🌐 Deploy e Links

## 🌐 Deploy e Links

- **Aplicação Publicada:** https://projeto-front-end-pi.vercel.app
- **Repositório:** https://github.com/rooseveltvmj/ProjetoFrontEnd
- **Relatório Lighthouse:** Veja o arquivo `lighthouse-report.html` na raiz do projeto.
- **Arquitetura:** Detalhes da implementação em `ARCHITECTURE.md`.

## 🏁 Como Rodar Localmente

1. Clone o repositório e instale as dependências:
   ```bash
   npm install

## ⚠️ Nota Importante sobre o Deploy (Vercel)
Como este é um desafio focado em **Frontend** e não possui um backend real integrado, o **Mock Service Worker (MSW)** foi intencionalmente configurado para rodar também no ambiente de produção (Vercel). 

Isso garante que os avaliadores possam testar todos os fluxos (Catálogo, Carrinho, Checkout e Autenticação) com dados simulados de forma fluida, sem encontrar erros de rede (404) na URL pública. Em um cenário de produção real com backend, essa camada de mocks seria desativada.