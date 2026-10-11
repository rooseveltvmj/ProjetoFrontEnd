// src/lib/auth.tsx
import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from '@tanstack/react-router';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
    
    // Escuta mudanças no localStorage
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
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    updateAuth();
    
    // Escuta mudanças no localStorage
    window.addEventListener('storage', updateAuth);
    
    // Atualiza quando foca na janela (após login/register)
    window.addEventListener('focus', updateAuth);
    
    return () => {
      window.removeEventListener('storage', updateAuth);
      window.removeEventListener('focus', updateAuth);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    // Dispara evento para outros componentes saberem
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/';
  };

  return { user, logout, isAuthenticated };
}