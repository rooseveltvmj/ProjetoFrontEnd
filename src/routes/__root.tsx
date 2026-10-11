// src/routes/__root.tsx
import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useCartStore } from '@/lib/cartStore';
import { useAuth } from '@/lib/auth';
import { ShoppingCart, Wallet, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const Route = createRootRoute({
  component: () => {
    const getItemCount = useCartStore((state) => state.getItemCount);
    const itemCount = getItemCount();
    const { user, logout, isAuthenticated } = useAuth();

    return (
      <div className="min-h-screen bg-background flex flex-col font-sans">
        {/* Header com efeito de vidro fosco */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary hover:opacity-80 transition-opacity">
              <span className="text-2xl">💎</span>
              <span>Jungle NFT</span>
            </Link>

            {/* Navegação Central (escondida em mobile) */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Marketplace
              </Link>
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Creators
              </Link>
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Community
              </Link>
            </nav>

            {/* Ações da Direita */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Search className="w-5 h-5" />
              </Button>
              
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground border-0">
                    {itemCount}
                  </Badge>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                   <span className="text-sm font-medium hidden sm:block text-foreground">{user?.name}</span>
                   <Button variant="outline" size="sm" onClick={logout}>
                     Sair
                   </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-semibold">
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8 flex-1">
          <Outlet />
        </main>
        
        <TanStackRouterDevtools position="bottom-right" />
      </div>
    );
  },
});