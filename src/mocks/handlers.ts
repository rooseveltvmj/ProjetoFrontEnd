// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';
import { MOCK_NFTS, MOCK_USERS } from './data';

export const handlers = [
  // GET /api/nfts - Lista o catálogo
  http.get('/api/nfts', async () => {
    await delay(400);
    return HttpResponse.json(MOCK_NFTS);
  }),

  // GET /api/nfts/:id - Detalhe de um NFT
  http.get('/api/nfts/:id', async ({ params }) => {
    await delay(200);
    const nft = MOCK_NFTS.find((n) => n.id === params.id);
    if (!nft) {
      return new HttpResponse(null, { status: 404, statusText: 'NFT not found' });
    }
    return HttpResponse.json(nft);
  }),

  // POST /api/auth/login - Login simulado
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500);
    const body = await request.json() as any;
    
    // Simulação simples: aceita o email do mock ou qualquer um para teste
    const user = MOCK_USERS.find(u => u.email === body.email) || {
      id: 'user-new',
      email: body.email,
      name: body.email.split('@')[0],
    };

    return HttpResponse.json({
      token: 'mock-token-123',
      user: user,
    });
  }),

  // POST /api/auth/register - Cadastro simulado (NOVO)
  http.post('/api/auth/register', async ({ request }) => {
    await delay(600);
    const body = await request.json() as any;
    
    const existingUser = MOCK_USERS.find(u => u.email === body.email);
    if (existingUser) {
      return new HttpResponse(JSON.stringify({ error: 'Email já cadastrado' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return HttpResponse.json({
      success: true,
      user: {
        id: `user-${Date.now()}`,
        email: body.email,
        name: body.name,
      }
    });
  }),

  // POST /api/orders - Simula o checkout/pagamento (NOVO)
  http.post('/api/orders', async ({ request }) => {
    await delay(1500); // Simula processamento do pagamento
    
    const body = await request.json() as any;
    
    return HttpResponse.json({
      success: true,
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      txHash: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      total: body.total,
      items: body.items,
    });
  }),
];