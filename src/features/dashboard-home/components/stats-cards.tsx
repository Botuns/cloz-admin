// DashboardStats.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star, DollarSign, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboardStats } from "../api/use-dahboard-stats";
import { Decimal } from "@/generated/prisma/runtime/library";

export function StatsCards() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useDashboardStats();

  const statsConfig = [
    {
      title: "Total Orders",
      value: data?.totalOrders ?? (0 as string | number | Decimal),
      icon: ShoppingCart,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      formatter: (value: string | number | Decimal) => value.toLocaleString(),
    },
    {
      title: "Top Selling Products",
      value: data?.topSellingProductsCount ?? (0 as string | number | Decimal),
      icon: Star,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      formatter: (value: string | number | Decimal) => value.toString(),
    },
    {
      title: "Total Revenue",
      value: data?.totalRevenue ?? (0 as string | number | Decimal),
      icon: DollarSign,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      formatter: (value: string | number | Decimal) =>
        `₦${value.toLocaleString()}`,
    },
  ];

  if (isError) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-red-600">
            Failed to load dashboard stats: {error?.message}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`}
            />
            Retry
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statsConfig.map((stat) => (
            <Card key={stat.title} className="p-6 opacity-50">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full bg-red-100`}>
                    <stat.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-sm text-red-600">Error</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Optional: Show refresh button and loading indicator */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Dashboard Stats</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsConfig.map((stat) => (
          <Card key={stat.title} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.iconBg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                  ) : (
                    <p className="text-2xl font-bold">
                      {stat.formatter(stat.value)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
