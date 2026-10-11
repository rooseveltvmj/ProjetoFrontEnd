// src/lib/socket.ts
import { io } from 'socket.io-client';

// Em um cenário real, isso viria de uma variável de ambiente (ex: import.meta.env.VITE_SOCKET_URL)
// Usamos localhost:3000 como padrão, que é onde o backend do desafio rodaria.
export const socket = io('http://localhost:3000', {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
});