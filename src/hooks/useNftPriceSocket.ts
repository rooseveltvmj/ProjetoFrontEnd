// src/hooks/useNftPriceSocket.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socket } from '@/lib/socket';
import type { NFT } from '@/types';

export function useNftPriceSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Escuta o evento real do servidor
    socket.on('nft:price_update', (data: { id: string; newPrice: string }) => {
      // 1. Atualiza a lista do catálogo
      queryClient.setQueryData<NFT[]>(['nfts'], (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((nft) => 
          nft.id === data.id ? { ...nft, price: data.newPrice } : nft
        );
      });

      // 2. Atualiza a página de detalhe (se estiver aberta)
      queryClient.setQueryData<NFT>(['nft', data.id], (oldData) => {
        if (!oldData) return oldData;
        return { ...oldData, price: data.newPrice };
      });
    });

    // Cleanup: remove o listener quando o componente desmonta
    return () => {
      socket.off('nft:price_update');
    };
  }, [queryClient]);
}