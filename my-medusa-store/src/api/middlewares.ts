import { 
    defineMiddlewares,
    validateAndTransformBody,
    validateAndTransformQuery,
  } from "@medusajs/framework/http"
  import { PostAdminCreateBrand, PutAdminUpdateBrand } from "./admin/brands/validators"
  import { z } from "zod"
import { createFindParams } from "@medusajs/medusa/api/utils/validators"

  export const GetBrandsSchema = createFindParams()

  
  export default defineMiddlewares({
    routes: [
      {
        matcher: "/admin/brands",
        method: "POST",
        middlewares: [
          validateAndTransformBody(PostAdminCreateBrand),
        ],
      },
      {
        matcher: "/admin/brands/:id",
        method: "PUT",
        middlewares: [
          validateAndTransformBody(PutAdminUpdateBrand),
        ],
      },
      {
        matcher: "/admin/products",
        method: ["POST"],
        additionalDataValidator: {
          brand_id: z.string().optional(),
        },
      },
      {
        matcher: "/admin/brands",
        method: "GET",
        middlewares: [
          validateAndTransformQuery(
            GetBrandsSchema,
            {
              defaults: [
                "id",
                "name",
                "products.*",
              ],
              isList: true,
            }
          ),
        ],
      }
    ],
  })