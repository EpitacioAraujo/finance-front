import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const ME_QUERY_KEY = ["auth", "me"];

export function useMeQuery() {
  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: () => api.auth.me(),
    staleTime: 1000 * 60,
    retry: false,
  });
}
