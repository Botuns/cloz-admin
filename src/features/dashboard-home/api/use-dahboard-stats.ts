import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await client.api.v1.dashboard.stats["$get"]();
      if (!res.ok) throw new Error("Failed to fetch dashboard stats");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
