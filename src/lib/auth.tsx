// src/lib/auth.tsx
import type { ReactNode } from 'react'; // 👈 Correção 1: import type
import { useEffect, useState } from 'react';
import { Navigate } from '@tanstack/react-router';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      // 👈 Correção 2: Usado diretamente sem declarar variável
      setIsAuthenticated(!!localStorage.getItem('auth_token'));
    };
    
    checkAuth();
    
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const updateAuth = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('auth_token');
      
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    updateAuth();
    
    window.addEventListener('storage', updateAuth);
    window.addEventListener('focus', updateAuth);
    
    return () => {
      window.removeEventListener('storage', updateAuth);
      window.removeEventListener('focus', updateAuth);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/';
  };

  return { user, logout, isAuthenticated };
}