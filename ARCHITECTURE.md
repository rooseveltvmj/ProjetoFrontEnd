# Arquitetura do Projeto - NFT Marketplace

## 1. Estrutura de Pastas
- `src/routes/`: Roteamento baseado em arquivos com TanStack Router.
- `src/lib/`: Configurações de infraestrutura (API Axios, TanStack Query, Socket.IO, Zustand Store, Auth).
- `src/mocks/`: Handlers do MSW e dados fictícios para desenvolvimento e testes.
- `src/components/ui`: Componentes de base do shadcn/ui.
- `src/hooks/`: Hooks customizados (ex: `useNftPriceSocket` para sincronização em tempo real).

## 2. Gerenciamento de Estado e Cache
- **Estado Global (Carrinho)**: Gerenciado com **Zustand** + middleware `persist`, garantindo que o carrinho sobreviva a refreshes da página.
- **Estado Remoto (Catálogo/Detalhes)**: Gerenciado com **TanStack Query**. A política de cache utiliza `staleTime` padrão, com invalidação automática após mutations.
- **Sessão**: Token e dados do usuário salvos no `localStorage`. Rotas protegidas verificam a presença do token antes de renderizar.

## 3. Integração em Tempo Real (Socket.IO)
- O hook `useNftPriceSocket` escuta o evento `nft:price_update`.
- Ao receber o evento, ele **não atualiza o estado local do componente**, mas sim o cache do TanStack Query (`queryClient.setQueryData`). Isso garante que a UI reaja consistentemente, seja no catálogo ou na página de detalhes, sem re-renderizações desnecessárias.
- *Limitação*: Como o backend é simulado via MSW, o Socket.IO está configurado para `localhost:3000`. Em produção, apontaria para a URL real do servidor.

## 4. Mocking (MSW)
- Os mocks interceptam requisições em nível de rede (Service Worker).
- Inclui simulação de latência (`delay`), respostas de erro (404, 409, 500) e fluxo completo de autenticação e checkout.

## 5. Decisões de UX e Acessibilidade
- Utilização de componentes do `shadcn/ui` que já possuem acessibilidade embutida (foco visível, roles ARIA, navegação por teclado).
- Skeletons com dimensões fixas para evitar Layout Shift (CLS) durante o carregamento.
- Feedback visual imediato (badges, estados de loading nos botões) para todas as mutations.

## 6. Desvios do Figma
- O tema de cores foi adaptado para o padrão `zinc` do shadcn/ui para garantir contraste e consistência, mantendo a hierarquia visual solicitada.