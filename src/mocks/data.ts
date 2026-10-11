// src/mocks/data.ts
import type { NFT, User } from '../types';

export const MOCK_NFTS: NFT[] = [
  {
    id: '1',
    name: 'Cosmic Voyager #001',
    collection: 'Space Explorers',
    price: '0.5',
    image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=800&q=80',
    creator: '0x123...abc',
    stock: 10,
  },
  {
    id: '2',
    name: 'Cyber Punk #042',
    collection: 'Future City',
    price: '1.2',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    creator: '0x456...def',
    stock: 2,
  },
  {
    id: '3',
    name: 'Abstract Mind #007',
    collection: 'Dreams',
    price: '0.05',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    creator: '0x789...ghi',
    stock: 50,
  },
  {
    id: '4',
    name: 'Neon Dreams #015',
    collection: 'Cyberpunk',
    price: '2.5',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    creator: '0xabc...123',
    stock: 5,
  },
  {
    id: '5',
    name: 'Pixel Art #099',
    collection: 'Retro Gaming',
    price: '0.8',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=800&q=80',
    creator: '0xdef...456',
    stock: 20,
  },
  {
    id: '6',
    name: 'Digital Soul #033',
    collection: 'Consciousness',
    price: '3.0',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80',
    creator: '0x789...abc',
    stock: 1,
  },
];

export const MOCK_USERS: User[] = [
  {
    id: 'user1',
    email: 'colecionador@jungle.com',
    name: 'Colecionador Teste',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 'user2',
    email: 'artista@jungle.com',
    name: 'Artista Digital',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
  },
];