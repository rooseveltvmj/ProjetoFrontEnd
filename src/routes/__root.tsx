// src/routes/__root.tsx
import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useCartStore } from '@/lib/cartStore';
import { useAuth } from '@/lib/auth';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const Route = createRootRoute({
  component: () => {
    const getItemCount = useCartStore((state) => state.getItemCount);
    const itemCount = getItemCount();
    const { user, logout, isAuthenticated } = useAuth();

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
              NFT Marketplace
            </Link>
            <nav className="flex gap-4 items-center">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Catálogo
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/cart" className="relative p-2 hover:bg-accent rounded-full transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    {itemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                        {itemCount}
                      </Badge>
                    )}
                  </Link>
                  <div className="flex items-center gap-3 border-l pl-4 ml-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{user?.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={logout} className="h-8 w-8 p-0">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm">Entrar</Button>
                </Link>
              )}
            </nav>
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