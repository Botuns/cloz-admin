"use client";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface useGetRecentOrdersProps {
  limit?: number | string;
}

export function useGetRecentOrders({ limit = 5 }: useGetRecentOrdersProps) {
  return useQuery({
    queryKey: ["recent-orders", limit],
    queryFn: async () => {
      const res = await client.api.v1.dashboard["recent-orders"]["$get"]({
        query: { limit: limit.toString() },
      });
      console.log("Fetching recent orders----:", await res.json());
      if (!res.ok) throw new Error("Failed to fetch recent orders");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
