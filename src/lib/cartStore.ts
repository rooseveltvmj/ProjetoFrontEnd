// src/lib/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, NFT } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (nft: NFT) => void;
  removeItem: (nftId: string) => void;
  updateQuantity: (nftId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => string;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (nft) => set((state) => {
        const existingItem = state.items.find((item) => item.nftId === nft.id);
        
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.nftId === nft.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        
        return {
          items: [...state.items, { nftId: nft.id, quantity: 1, nft }],
        };
      }),
      
      removeItem: (nftId) => set((state) => ({
        items: state.items.filter((item) => item.nftId !== nftId),
      })),
      
      updateQuantity: (nftId, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.nftId === nftId ? { ...item, quantity } : item
        ),
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        const total = get().items.reduce((sum, item) => {
          return sum + parseFloat(item.nft.price) * item.quantity;
        }, 0);
        return total.toFixed(2);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);