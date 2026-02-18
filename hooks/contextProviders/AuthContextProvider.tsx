'use client';

import { createContext, useContext as useReactContext, useCallback, useEffect, useState } from "react";
import * as MeRoute from "@/lib/api/types/auth/me";
import { useMeQuery, ME_QUERY_KEY } from "@/hooks/queries/useMeQuery";
import { useQueryClient } from "@tanstack/react-query";

type AuthUser = MeRoute.Response;

// Hook para inicializar o contexto
const useAuthContextValue = () => {
  const queryClient = useQueryClient();
  const { data, isFetching, isLoading: isQueryLoading, refetch } = useMeQuery();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    const response = await refetch();
    const nextUser = response.data?.data ?? null;
    setUser(nextUser ?? null);
    setIsLoading(false);
    return nextUser;
  }, [refetch]);

  const clearSession = useCallback(() => {
    setUser(null);
    queryClient.setQueryData(ME_QUERY_KEY, undefined);
  }, [queryClient]);

  useEffect(() => {
    if (isQueryLoading || isFetching) {
      setIsLoading(true);
      return;
    }
    const nextUser = data?.data ?? null;
    setUser(nextUser);
    setIsLoading(false);
  }, [data, isFetching, isQueryLoading]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    refreshSession,
    clearSession,
  };
};

type AuthContextType = ReturnType<typeof useAuthContextValue>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const contextValue = useAuthContextValue();

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useReactContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};