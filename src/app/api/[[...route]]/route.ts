import authRoutes from "@/features/auth/server/route";
import dashboardRoutes from "@/features/dashboard-home/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";
const app = new Hono().basePath("/api/v1");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", authRoutes)
  .route("/dashboard", dashboardRoutes);

export const OPTIONS = handle(app);
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;
