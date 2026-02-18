'use client';

// import { useProducts } from '@/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
// import { BUSINESS_RULES } from '@/lib/domain/constants';

export default function DashboardPage() {
  const products: any[] = []; // useProducts();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Text asChild variant="h1">
          <h1>Dashboard</h1>
        </Text>
        <Text tone="muted">Visão geral do seu inventário e vendas</Text>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Text asChild variant="h2">
              <div>10</div>
            </Text>
            <Text variant="caption" tone="muted">10 ativos</Text>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Text asChild variant="h2">
              <div>0</div>
            </Text>
            <Text variant="caption" tone="muted">0 confirmados</Text>
          </CardContent>
        </Card>

        {/* Low Stock Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <Text asChild variant="h2">
              <div>10</div>
            </Text>
            {/* <p className="text-xs text-muted-foreground">
              Menos de {BUSINESS_RULES.MIN_LOW_STOCK} unidades
            </p> */}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Recentes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Text asChild variant="h2">
              <div>0</div>
            </Text>
            <Text variant="caption" tone="muted">Últimos 7 dias</Text>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link href="/products">
          <Button variant="outline">Ver Produtos (10)</Button>
        </Link>
        <Link href="/orders">
          <Button variant="outline">Ver Pedidos</Button>
        </Link>
      </div>

      {/* Products List Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <Text tone="muted">Nenhum produto criado ainda</Text>
          ) : (
            <div className="space-y-2">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <Text asChild>
                      <p className="font-medium">{product.name}</p>
                    </Text>
                    <Text variant="body-sm" tone="muted">
                      {product.unitOfMeasure}
                    </Text>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <Button variant="ghost" size="sm">
                      Ver
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
