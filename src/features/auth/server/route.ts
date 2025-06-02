import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createAdminUserSchema } from "@/features/auth/types";
import { createAdminUserAction } from "../actions";

const authRoutes = new Hono().post(
  "/admin/create",
  zValidator("json", createAdminUserSchema),
  async (c) => {
    const payload = c.req.valid("json");

    const response = await createAdminUserAction(payload);
    if (response.error) {
      return c.json(
        { error: response.error, message: response.message },
        response.status || 500
      );
    }

    return c.json(response);
  }
);

export default authRoutes;
