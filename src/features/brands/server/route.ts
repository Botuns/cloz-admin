import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createBrandSchema } from "@/features/brands/types";
import { createBrandAction } from "../actions";

const brandRoutes = new Hono().post(
  "/create",
  zValidator("json", createBrandSchema),
  async (c) => {
    const payload = c.req.valid("json");
    const response = await createBrandAction(payload);

    if (response.error) {
      return c.json(
        { error: response.error, message: response.message },
        response.status || 500
      );
    }

    return c.json(response);
  }
);

export default brandRoutes;
