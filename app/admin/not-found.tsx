'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Página não encontrada</p>
        <p className="text-sm text-muted-foreground mb-8 max-w-md">
          A página que você está procurando não existe ou foi movida. Verifique a URL e tente novamente.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/admin">Voltar ao Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
