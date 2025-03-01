import { z } from "zod"

export const PostAdminCreateBrand = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export const PutAdminUpdateBrand = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
})