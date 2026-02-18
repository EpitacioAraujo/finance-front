'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-destructive" />
        </div>
        <Text asChild variant="display" className="mb-2">
          <h1>404</h1>
        </Text>
        <Text variant="h3" tone="muted" className="mb-8">
          Página não encontrada
        </Text>
        <Text variant="body-sm" tone="muted" className="mb-8 max-w-md">
          A página que você está procurando não existe ou foi movida. Verifique a URL e tente novamente.
        </Text>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/admin">Voltar ao Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
