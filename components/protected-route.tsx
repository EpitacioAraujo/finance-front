'use client';

import { useAuthContext } from '@/hooks/contextProviders/AuthContextProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const loginPath = pathname.startsWith('/admin') ? '/admin/login' : '/login';
      router.push(loginPath);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return null; // ou um loading spinner
  }

  if (!isAuthenticated) {
    return null; // evita render enquanto redireciona
  }

  return <>{children}</>;
}
