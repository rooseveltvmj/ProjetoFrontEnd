// src/routes/index.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useNftPriceSocket } from '@/hooks/useNftPriceSocket';
import type { NFT } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Flame } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Catalog,
});

function Catalog() {
  const { data: nfts, isLoading, error } = useQuery<NFT[]>({
    queryKey: ['nfts'],
    queryFn: async () => {
      const response = await api.get('/nfts');
      return response.data;
    },
  });

  useNftPriceSocket();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="bg-card border-border">
            <Skeleton className="h-64 w-full rounded-t-xl" />
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive text-lg font-semibold">Erro ao carregar NFTs</p>
        <p className="text-muted-foreground text-sm mt-2">Tente novamente mais tarde</p>
      </div>
    );
  }

  if (!nfts || nfts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">Nenhum NFT encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Explore <span className="text-primary">NFTs</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Descubra, colecione e venda NFTs exclusivos na Jungle Gaming.
          </p>
        </div>
        
        {/* Filtros Rápidos (Visual) */}
        <div className="flex gap-2">
           <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors">
             <Flame className="w-3 h-3 mr-1" /> Trending
           </Badge>
           <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors">
             Recent
           </Badge>
        </div>
      </div>

      {/* Grid de NFTs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <Link key={nft.id} to="/nfts/$id" params={{ id: nft.id }}>
            <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden h-full flex flex-col">
              
              {/* Imagem com Overlay no Hover */}
              <div className="aspect-square overflow-hidden bg-muted relative">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold px-4 py-2 bg-primary rounded-full text-sm">
                    Ver Detalhes
                  </span>
                </div>
              </div>
              
              <CardContent className="p-4 flex-1">
                <h3 className="font-semibold text-lg text-foreground line-clamp-1 mb-1">{nft.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{nft.collection}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Criador:</span>
                  <span className="font-mono text-primary">{nft.creator}</span>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 mt-auto border-t border-border/50 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Preço</span>
                  <span className="text-base font-bold text-primary">{nft.price} ETH</span>
                </div>
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                  {nft.stock} disp.
                </Badge>
              </CardFooter>
              
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}