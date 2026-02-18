import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Hook que configura um tratamento global para erros 401
 * Redireciona para login com o caminho atual como query parameter
 */
export function useHandleUnauthorized() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const handleUnauthorized = useCallback(() => {
    // Não redirecionar se já está na página de login
    if (pathname === "/login" || pathname === "/admin/login") {
      return;
    }

    // Limpar cache
    queryClient.clear();

    // Redirecionar para login com o caminho atual
    const loginPath = pathname.startsWith("/admin") ? "/admin/login" : "/login";
    const loginUrl = new URL(loginPath, window.location.origin);
    loginUrl.searchParams.set("redirect_to", pathname);

    router.push(loginUrl.pathname + loginUrl.search);
  }, [pathname, router, queryClient]);

  return { handleUnauthorized };
}
