// src/routes/cart.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { useCartStore } from '@/lib/cartStore';
import { ProtectedRoute } from '@/lib/auth'; // 👈 1. IMPORTAR O PROTECTED ROUTE
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

export const Route = createFileRoute('/cart')({
  // 👈 2. ENVOLVER O COMPONENTE COM PROTECTED ROUTE
  component: () => (
    <ProtectedRoute>
      <CartContent />
    </ProtectedRoute>
  ),
});

// 👈 3. RENOMEAR A FUNÇÃO PARA CartContent
function CartContent() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Carrinho vazio</h2>
        <p className="text-muted-foreground mb-6">Adicione NFTs ao seu carrinho para continuar</p>
        <Link to="/">
          <Button>Ver Catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Carrinho</h2>
        <Button variant="outline" onClick={clearCart}>
          Limpar Carrinho
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.nftId}>
            <CardContent className="p-4 flex gap-4">
              <img
                src={item.nft.image}
                alt={item.nft.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.nft.name}</h3>
                <p className="text-sm text-muted-foreground">{item.nft.collection}</p>
                <p className="text-lg font-bold text-primary mt-2">
                  {item.nft.price} ETH
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.nftId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Badge variant="secondary" className="text-base">
                    {item.quantity}
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.nftId, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeItem(item.nftId)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardFooter className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total ({getItemCount()} itens)</p>
            <p className="text-3xl font-bold text-primary">{getTotal()} ETH</p>
          </div>
          <Link to="/checkout">
            <Button size="lg">Finalizar Compra</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}