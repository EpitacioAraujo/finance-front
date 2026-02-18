'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Package,
  Users,
  Clock,
  FileText,
  BarChart3,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useLogoutMutation } from '@/hooks/mutations/useLogoutMutation';
import { setUnauthorizedHandler } from '@/lib/api/api-client';
import { useHandleUnauthorized } from '@/hooks/useHandleUnauthorized';
import { useAuthContext } from '@/hooks/contextProviders/AuthContextProvider';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Transações',
    href: '/admin/transactions',
    icon: Package,
  },
];

export function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const {user} = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoutMutation = useLogoutMutation();

  const { handleUnauthorized } = useHandleUnauthorized();

  // Registrar handler de 401 quando o componente montar
  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized);
  }, [handleUnauthorized]);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Ignorar erros de rede no logout para garantir a navegação
    } finally {
      router.push('/login');
    }
  };

  const canAccess = (item: NavItem) => {
    return true;
  };

  const filteredNavigation = navigation.filter(canAccess);

  const isActive = useCallback((href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname === href || pathname.startsWith(href + '/');
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out dark:bg-zinc-900 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b px-6 dark:border-zinc-800">
            <h1 className="text-xl font-bold">Dibiê ERP</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User info */}
          <div className="border-b px-6 py-4 dark:border-zinc-800">
            <p className="text-sm font-medium">{user?.name}</p>
            {/* <div className="mt-1 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {user?.role}
              </Badge>
            </div> */}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActiveItem = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActiveItem
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="border-t p-3 dark:border-zinc-800">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center border-b bg-white px-6 dark:border-zinc-800 dark:bg-zinc-900">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-4 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-semibold">
            {filteredNavigation.find((item) => isActive(item.href))?.title || 'Dibiê ERP'}
          </h2>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
