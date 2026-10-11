// src/components/TestApi.tsx
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { NFT } from '../types';

export function TestApi() {
  const { data, isLoading, error } = useQuery<NFT[]>({
    queryKey: ['nfts'],
    queryFn: async () => {
      const response = await api.get('/nfts');
      return response.data;
    },
  });

  if (isLoading) return <p className="text-muted-foreground">Carregando NFTs...</p>;
  if (error) return <p className="text-destructive">Erro ao carregar NFTs</p>;

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">NFTs recebidos da API:</h2>
      <ul className="space-y-1">
        {data?.map((nft) => (
          <li key={nft.id} className="text-sm">
            <strong>{nft.name}</strong> — {nft.price} ETH
          </li>
        ))}
      </ul>
    </div>
  );
}