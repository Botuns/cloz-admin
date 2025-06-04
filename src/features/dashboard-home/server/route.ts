import { Hono } from "hono";
import {
  getDashboardStats,
  getRecentOrders,
  getTopSellingProducts,
  getTotalOrdersCount,
} from "@/server/queries";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const dashboardRoutes = new Hono()
  .get("/stats", async (c) => {
    const [totalOrders, topSellingProducts, dashboardStats] = await Promise.all(
      [getTotalOrdersCount(), getTopSellingProducts(), getDashboardStats()]
    );

    return c.json({
      totalOrders,
      topSellingProductsCount: topSellingProducts.length,
      totalRevenue: dashboardStats.totalRevenue,
    });
  })
  .get(
    "/recent-orders",
    zValidator(
      "query",
      z.object({
        limit: z.string().nullish().default("5"),
      })
    ),
    async (c) => {
      const { limit } = c.req.valid("query");
      const recentOrders = await getRecentOrders(
        parseInt(limit ?? "", 10) as number
      );
      return c.json(recentOrders);
    }
  );

export default dashboardRoutes;
