// src/routes/checkout.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useCartStore } from '@/lib/cartStore';
import { ProtectedRoute } from '@/lib/auth'; // 👈 1. IMPORTAR O PROTECTED ROUTE
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CreditCard } from 'lucide-react';

export const Route = createFileRoute('/checkout')({
  // 👈 2. ENVOLVER O COMPONENTE COM PROTECTED ROUTE
  component: () => (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  ),
});

// 👈 3. RENOMEAR A FUNÇÃO PARA CheckoutContent
function CheckoutContent() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  
  // Busca dados frescos dos NFTs para garantir que o preço/estoque está atualizado
  const { data: nfts, isLoading } = useQuery({
    queryKey: ['nfts'],
    queryFn: async () => {
      const response = await api.get('/nfts');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (items.length === 0) {
    navigate({ to: '/cart' });
    return null;
  }

  const handleCheckout = async () => {
    try {
      const response = await api.post('/orders', {
        items: items.map(item => ({ nftId: item.nftId, quantity: item.quantity })),
        total: getTotal(),
      });

      if (response.data.success) {
        clearCart(); // Limpa o carrinho após compra bem-sucedida
        navigate({ to: `/order/${response.data.orderId}`, search: { txHash: response.data.txHash, total: response.data.total } });
      }
    } catch (error) {
      alert('Erro ao processar o pagamento. Tente novamente.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Finalizar Compra</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.nftId} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-semibold">{item.nft.name}</p>
                <p className="text-sm text-muted-foreground">Qtd: {item.quantity} x {item.nft.price} ETH</p>
              </div>
              <p className="font-bold">{(parseFloat(item.nft.price) * item.quantity).toFixed(2)} ETH</p>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 text-xl font-bold">
            <span>Total</span>
            <span className="text-primary">{getTotal()} ETH</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" onClick={handleCheckout}>
            <CreditCard className="w-4 h-4 mr-2" />
            Confirmar Pagamento
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}