// tests/nft-purchase.spec.ts
import { test, expect } from '@playwright/test';

test('Fluxo completo de compra de NFT', async ({ page }) => {
  // 1. Acessa o catálogo
  await page.goto('/');
  await expect(page).toHaveTitle(/NFT Marketplace/);

  // 2. Clica no primeiro NFT da lista (Cosmic Voyager)
  await page.getByText('Cosmic Voyager #001').first().click();
  
  // Verifica se foi para a página de detalhe
  await expect(page).toHaveURL(/\/nfts\/1/);
  await expect(page.getByRole('heading', { name: 'Cosmic Voyager #001' })).toBeVisible();

  // 3. Adiciona ao carrinho
  await page.getByRole('button', { name: /Adicionar ao Carrinho/i }).click();
  
  // Verifica se o badge do carrinho no header atualizou para '1'
  await expect(page.locator('header').getByText('1')).toBeVisible();

  // 4. Vai para o carrinho clicando no link do carrinho
  await page.getByRole('link', { name: /Carrinho/i }).click();
  await expect(page).toHaveURL(/\/cart/);
  await expect(page.getByText('Cosmic Voyager #001')).toBeVisible();

  // 5. Vai para o Checkout
  await page.getByRole('button', { name: /Finalizar Compra/i }).click();
  await expect(page).toHaveURL(/\/checkout/);
  await expect(page.getByText('Resumo do Pedido')).toBeVisible();
  
  // 6. Confirma o pagamento
  await page.getByRole('button', { name: /Confirmar Pagamento/i }).click();

  // 7. Verifica a tela de sucesso (o MSW simula 1.5s de delay, o Playwright espera automaticamente)
  await expect(page).toHaveURL(/\/order\//);
  await expect(page.getByText('Compra Realizada com Sucesso!')).toBeVisible();
  await expect(page.getByText('Hash da Transação:')).toBeVisible();
});