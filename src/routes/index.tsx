// src/routes/index.tsx
import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useNftPriceSocket } from '@/hooks/useNftPriceSocket';
import type { NFT } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Flame, Search } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Catalog,
});

function Catalog() {
  const [search, setSearch] = useState('');

  const { data: nfts, isLoading, error } = useQuery<NFT[]>({
    queryKey: ['nfts'],
    queryFn: async () => {
      const response = await api.get('/nfts');
      
      // 🛡️ BLINDAGEM: Garante que sempre retornaremos um Array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      // Caso a API retorne um objeto { data: [...] }
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return [];
    },
  });

  useNftPriceSocket();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-10 w-64 bg-muted rounded animate-pulse" />
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        <p className="text-destructive text-lg font-semibold">Erro ao carregar os NFTs</p>
        <p className="text-muted-foreground text-sm mt-2">Tente novamente mais tarde</p>
      </div>
    );
  }

  // 🛡️ BLINDAGEM: Garante que a variável é um Array antes de filtrar
  const safeNfts = Array.isArray(nfts) ? nfts : [];

  const filteredNfts = safeNfts.filter((nft) =>
    nft.name.toLowerCase().includes(search.toLowerCase()) ||
    nft.collection.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Cabeçalho e Busca */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Flame className="w-8 h-8 text-primary" />
            Explore <span className="text-primary">NFTs</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Descubra, colecione e venda NFTs exclusivos na Jungle Gaming.
          </p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome ou coleção..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid de NFTs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNfts.map((nft, index) => (
          <Link 
            key={nft.id} 
            to="/nfts/$id" 
            params={{ id: nft.id }}
          >
            <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden h-full flex flex-col">
              
              <div className="aspect-square overflow-hidden bg-muted relative">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
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
      
      {filteredNfts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Nenhum NFT corresponde à sua busca.
        </div>
      )}
    </div>
  );
}