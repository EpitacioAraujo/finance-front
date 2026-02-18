'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { AdminAppLayout } from '@/components/admin-app-layout';
import { usePathname } from 'next/navigation';

/**
 * Protected Routes Layout
 * Agrupa todas as rotas protegidas (autenticadas)
 * Aplica ProtectedRoute + AdminAppLayout automaticamente
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
      <AdminAppLayout>{children}</AdminAppLayout>
    </ProtectedRoute>
  );
}
