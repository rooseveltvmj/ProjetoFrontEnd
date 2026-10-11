// src/routes/order/$id.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Copy } from 'lucide-react';

export const Route = createFileRoute('/order/$id')({
  component: OrderConfirmation,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      txHash: search.txHash as string,
      total: search.total as string,
    };
  },
});

function OrderConfirmation() {
  const { id } = Route.useParams();
  const { txHash, total } = Route.useSearch();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-2">Compra Realizada com Sucesso!</h2>
      <p className="text-muted-foreground mb-8">Seu NFT foi adicionado à sua carteira.</p>

      <Card className="text-left">
        <CardHeader>
          <CardTitle>Detalhes da Transação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">ID do Pedido:</span>
            <span className="font-mono font-semibold">{id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Pago:</span>
            <span className="font-bold text-primary">{total} ETH</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-muted-foreground mt-1">Hash da Transação:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{txHash}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => navigator.clipboard.writeText(txHash)}>
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link to="/" className="w-full">
            <Button className="w-full" size="lg">Voltar ao Catálogo</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}