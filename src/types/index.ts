// src/types/index.ts

export type NFT = {
  id: string;
  name: string;
  collection: string;
  price: string;
  image: string;
  creator: string;
  stock: number;
};

export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

export type CartItem = {
  nftId: string;
  quantity: number;
  nft: NFT;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: string;
  status: 'pending' | 'confirmed' | 'rejected';
  txHash?: string;
};