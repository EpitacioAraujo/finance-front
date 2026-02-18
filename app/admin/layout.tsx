'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { AppLayout } from '@/components/app-layout';
import { usePathname } from 'next/navigation';

/**
 * Protected Routes Layout
 * Agrupa todas as rotas protegidas (autenticadas)
 * Aplica ProtectedRoute + AppLayout automaticamente
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginRoute = pathname === '/admin/login';

  if (isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}
