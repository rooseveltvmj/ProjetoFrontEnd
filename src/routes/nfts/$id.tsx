// src/routes/nfts/$id.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useCartStore } from '@/lib/cartStore';
import { useNftPriceSocket } from '@/hooks/useNftPriceSocket'; // 👈 IMPORTAÇÃO ADICIONADA
import type { NFT } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export const Route = createFileRoute('/nfts/$id')({
  component: NftDetail,
});

function NftDetail() {
  const { id } = Route.useParams();
  const addItem = useCartStore((state) => state.addItem);
  
  const { data: nft, isLoading, error } = useQuery<NFT>({
    queryKey: ['nft', id],
    queryFn: async () => {
      const response = await api.get(`/nfts/${id}`);
      return response.data;
    },
  });

  // 👈 ATIVA O HOOK DO SOCKET.IO AQUI
  useNftPriceSocket();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !nft) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive text-lg">Erro ao carregar NFT</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(nft);
    alert(`${nft.name} adicionado ao carrinho!`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao catálogo
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <div className="aspect-square bg-muted">
            <img
              src={nft.image}
              alt={nft.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Card>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {nft.collection}
            </Badge>
            <h1 className="text-3xl font-bold">{nft.name}</h1>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Criador</p>
            <p className="font-mono text-sm">{nft.creator}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Preço atual</p>
            <p className="text-2xl font-bold text-primary">{nft.price} ETH</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Disponibilidade</p>
            <p className="text-lg font-semibold">
              {nft.stock} {nft.stock === 1 ? 'unidade disponível' : 'unidades disponíveis'}
            </p>
          </div>

          <Button 
            size="lg" 
            className="w-full" 
            onClick={handleAddToCart}
            disabled={nft.stock === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {nft.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
          </Button>
        </div>
      </div>
    </div>
  );
}