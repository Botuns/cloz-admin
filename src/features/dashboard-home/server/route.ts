import { Hono } from "hono";
import {
  getDashboardStats,
  getTopSellingProducts,
  getTotalOrdersCount,
} from "@/server/queries";

const dashboardRoutes = new Hono()
  .get("/stats", async (c) => {
  const [totalOrders, topSellingProducts, dashboardStats] = await Promise.all([
    getTotalOrdersCount(),
    getTopSellingProducts(),
    getDashboardStats(),
  ]);

  return c.json({
    totalOrders,
    topSellingProductsCount: topSellingProducts.length,
    totalRevenue: dashboardStats.totalRevenue,
  });
});

export default dashboardRoutes;
