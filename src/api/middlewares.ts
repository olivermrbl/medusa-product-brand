import { defineMiddlewares } from "@medusajs/medusa"
import { z } from "zod"

export default defineMiddlewares({
  routes: [
    {
      method: "POST",
      matcher: "/admin/products",
      additionalDataValidator: {
        brand_id: z.string().optional(),
      },
    },
    {
      method: "POST",
      matcher: "/admin/products/:id",
      additionalDataValidator: {
        brand_id: z.string().nullish(),
      },
    },
    {
      method: ["GET"],
      matcher: "/admin/brands",
      middlewares: [],
    },
  ],
})
